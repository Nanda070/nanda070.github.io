$passDir    = 'c:\Users\adnan\Documents\Coding\NFCProfile\nanda.pass'
$zipPath    = 'c:\Users\adnan\Documents\Coding\NFCProfile\nanda_unsigned.zip'
$pkpassPath = 'c:\Users\adnan\Documents\Coding\NFCProfile\nanda_unsigned.pkpass'

if (Test-Path $zipPath)    { Remove-Item $zipPath -Force }
if (Test-Path $pkpassPath) { Remove-Item $pkpassPath -Force }

# Compress contents of nanda.pass/ (not the folder itself)
Get-ChildItem -Path $passDir | Compress-Archive -DestinationPath $zipPath -Force

# Rename .zip -> .pkpass
Rename-Item -Path $zipPath -NewName 'nanda_unsigned.pkpass'

Write-Host 'Archive created!'
$item = Get-Item $pkpassPath
Write-Host ("Name: " + $item.Name)
Write-Host ("Size: " + [math]::Round($item.Length / 1KB, 1) + " KB")
