/**
 * NANDA Apple Wallet Pass — Manifest Generator
 * 
 * Запускать: node generate_pass.js
 * 
 * Что делает:
 * 1. Читает все файлы из папки nanda.pass/ (кроме manifest.json и signature)
 * 2. Вычисляет SHA1 хэш для каждого файла
 * 3. Записывает manifest.json в папку nanda.pass/
 * 4. Создаёт ZIP архив nanda.pkpass (без signature — для загрузки на Pass2U/PassKit)
 *
 * После этого:
 * → Загрузи папку на https://www.pass2u.net или https://passkit.com
 * → Они добавят signature и отдадут готовый .pkpass файл
 */

const fs   = require('fs');
const path = require('path');
const crypto = require('crypto');

// ─── Конфигурация ─────────────────────────────────────────────────────────────
const PASS_DIR    = path.join(__dirname, 'nanda.pass');
const MANIFEST    = path.join(PASS_DIR, 'manifest.json');
const OUTPUT_ZIP  = path.join(__dirname, 'nanda_unsigned.pkpass');

// Файлы которые НЕ включаются в manifest
// Apple Wallet only allows specific files — anything else causes rejection
const EXCLUDE = new Set(['manifest.json', 'signature', 'README.md', '.DS_Store']);

// ─── SHA1 helper ──────────────────────────────────────────────────────────────
function sha1File(filePath) {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('sha1').update(data).digest('hex');
}

// ─── 1. Генерация manifest.json ───────────────────────────────────────────────
console.log('\n🔧 NANDA Pass — Manifest Generator\n');
console.log('📁 Pass directory:', PASS_DIR);

if (!fs.existsSync(PASS_DIR)) {
  console.error('❌ Папка nanda.pass/ не найдена!');
  process.exit(1);
}

const files = fs.readdirSync(PASS_DIR).filter(f => !EXCLUDE.has(f));
const manifest = {};

for (const file of files) {
  const filePath = path.join(PASS_DIR, file);
  const stat = fs.statSync(filePath);
  if (stat.isFile()) {
    manifest[file] = sha1File(filePath);
    console.log(`  ✅ ${file.padEnd(30)} → ${manifest[file].slice(0, 12)}...`);
  }
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log('\n✅ manifest.json создан!');

// ─── 2. Создание ZIP (.pkpass) ────────────────────────────────────────────────
// Используем встроенный zlib + tar или простой буфер
// Для полноценного ZIP нужен пакет adm-zip или jszip
// Проверяем есть ли adm-zip

let zipCreated = false;

try {
  // Попытка использовать встроенный модуль
  const { execSync } = require('child_process');
  
  // PowerShell способ (Windows) — создаём .zip, потом переименовываем в .pkpass
  if (process.platform === 'win32') {
    const tempZip   = OUTPUT_ZIP.replace('.pkpass', '.zip');
    const psScript  = path.join(__dirname, 'package_pass.ps1');
    execSync(`powershell -ExecutionPolicy Bypass -File "${psScript}"`, { stdio: 'inherit' });
    zipCreated = fs.existsSync(OUTPUT_ZIP);
    if (zipCreated) console.log(`\n📦 Создан архив: ${path.basename(OUTPUT_ZIP)}`);
  } else {
    // macOS / Linux
    execSync(`cd "${PASS_DIR}" && zip -r "${OUTPUT_ZIP}" . -x "*.DS_Store" -x "README.md"`, { stdio: 'inherit' });
    zipCreated = true;
    console.log(`\n📦 Создан архив: ${path.basename(OUTPUT_ZIP)}`);
  }
} catch (e) {
  // fallback — просто сообщить
}

if (!zipCreated) {
  console.log('\n⚠️  ZIP не создан автоматически.');
  console.log('   Сделай это вручную:');
  console.log('   → Выдели все файлы в папке nanda.pass/');
  console.log('   → ПКМ → Отправить → Сжатая ZIP-папка');
  console.log('   → Переименуй в nanda.pkpass\n');
}

// ─── 3. Инструкции ───────────────────────────────────────────────────────────
console.log('\n═══════════════════════════════════════════════════════');
console.log('  СЛЕДУЮЩИЕ ШАГИ — ЗАГРУЗИ НА ОДИН ИЗ СЕРВИСОВ:');
console.log('═══════════════════════════════════════════════════════\n');
console.log('  🟢 Pass2U (БЕСПЛАТНО):');
console.log('     → https://www.pass2u.net/distribute');
console.log('     → Upload PKPass File → выбери nanda_unsigned.pkpass');
console.log('     → Получи ссылку для скачивания на iPhone\n');
console.log('  🔵 PassKit (Freemium):');
console.log('     → https://passkit.com');
console.log('     → New Pass → Generic → Upload folder\n');
console.log('  🟣 Walletpass.io (Freemium):');
console.log('     → https://walletpass.io');
console.log('     → Create Pass → Upload JSON\n');
console.log('  📱 Как добавить на iPhone:');
console.log('     → Открой ссылку на iPhone в Safari');
console.log('     → "Добавить в Apple Wallet" → Готово!\n');
console.log('═══════════════════════════════════════════════════════\n');
