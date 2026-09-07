Add-Type -AssemblyName System.Drawing

$artifactDir = 'C:\Users\adnan\.gemini\antigravity-ide\brain\27873b9e-b756-4c7e-a214-d954573012be'
$passDir = 'c:\Users\adnan\Documents\Coding\NFCProfile\nanda.pass'

$images = @(
    @{ src = 'wallet_icon_1788812655658.jpg';      dest = 'icon';         w = 29;  h = 29 },
    @{ src = 'wallet_icon_1788812655658.jpg';      dest = 'icon@2x';      w = 58;  h = 58 },
    @{ src = 'wallet_icon_1788812655658.jpg';      dest = 'icon@3x';      w = 87;  h = 87 },
    @{ src = 'wallet_logo_1788812672326.jpg';      dest = 'logo';         w = 160; h = 50 },
    @{ src = 'wallet_logo_1788812672326.jpg';      dest = 'logo@2x';      w = 320; h = 100 },
    @{ src = 'wallet_thumbnail_1788812710037.jpg'; dest = 'thumbnail';    w = 90;  h = 90 },
    @{ src = 'wallet_thumbnail_1788812710037.jpg'; dest = 'thumbnail@2x'; w = 180; h = 180 }
)

foreach ($img in $images) {
    $srcPath  = Join-Path $artifactDir $img.src
    $destPath = Join-Path $passDir ($img.dest + '.png')

    $bitmap  = [System.Drawing.Image]::FromFile($srcPath)
    $resized = New-Object System.Drawing.Bitmap($img.w, $img.h)
    $g = [System.Drawing.Graphics]::FromImage($resized)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.DrawImage($bitmap, 0, 0, $img.w, $img.h)
    $g.Dispose()
    $resized.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()
    $resized.Dispose()

    Write-Host ("OK: " + $img.dest + ".png (" + $img.w + "x" + $img.h + ")")
}

Write-Host "All images done!"
