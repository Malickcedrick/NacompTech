# NamCompTech Logo & Favicon Updater
# Run this script in PowerShell to update your local logo assets with the new file.

$UploadedLogo = "C:\Users\Gabz\.gemini\antigravity-ide\brain\c7f70f90-f752-4251-aba8-efce3be92eca\media__1782739427935.png"
$AssetsDir = Join-Path $PSScriptRoot "assets"

if (Test-Path $UploadedLogo) {
    # Copy to assets/logo.png
    Copy-Item $UploadedLogo (Join-Path $AssetsDir "logo.png") -Force
    Write-Host "✅ Updated assets/logo.png" -ForegroundColor Green

    # Copy to assets/logo-light.png
    Copy-Item $UploadedLogo (Join-Path $AssetsDir "logo-light.png") -Force
    Write-Host "✅ Updated assets/logo-light.png" -ForegroundColor Green

    # Copy to favicon.ico
    Copy-Item $UploadedLogo (Join-Path $PSScriptRoot "favicon.ico") -Force
    Write-Host "✅ Updated favicon.ico" -ForegroundColor Green
    
    Write-Host "`n🎉 All assets updated successfully! You can now commit and push the binary files to GitHub." -ForegroundColor Cyan
} else {
    Write-Error "Could not find the uploaded logo file at $UploadedLogo. Please verify the path."
}
