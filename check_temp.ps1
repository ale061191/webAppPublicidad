# Check and clean temp folders that might contain Convex cache
$ErrorActionPreference = "SilentlyContinue"

Write-Host "Checking TEMP folder for Convex cache..." -ForegroundColor Cyan
$tempFolder = $env:TEMP
$user = $env:USERNAME

# Check main temp
Get-ChildItem -Path $tempFolder -Directory | 
    Where-Object { $_.Name -like "*convex*" -or $_.Name -like "*$user*" } | 
    ForEach-Object {
        Write-Host "Found: $($_.FullName)" -ForegroundColor Yellow
    }

# Also check user's AppData local for any Convex cache
Write-Host "`nChecking AppData Local..." -ForegroundColor Cyan
Get-ChildItem -Path "$env:LOCALAPPDATA" -Directory | 
    Where-Object { $_.Name -like "*convex*" } | 
    ForEach-Object {
        Write-Host "Found AppData: $($_.FullName)" -ForegroundColor Red
    }

# Check in roaming
Write-Host "`nChecking AppData Roaming..." -ForegroundColor Cyan
Get-ChildItem -Path "$env:APPDATA" -Directory | 
    Where-Object { $_.Name -like "*convex*" } | 
    ForEach-Object {
        Write-Host "Found Roaming: $($_.FullName)" -ForegroundColor Red
    }