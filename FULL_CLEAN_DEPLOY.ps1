# Complete Clean and Deploy Script for Windows
Write-Host "=== COMPLETE CLEAN ===" -ForegroundColor Cyan

# 1. Clean node_modules cache
Write-Host "Cleaning node_modules/.cache..." -ForegroundColor Yellow
Remove-Item -Recurse -Force "node_modules/.cache" -ErrorAction SilentlyContinue

# 2. Clean .convex folder completely  
Write-Host "Cleaning .convex folder..." -ForegroundColor Yellow
Remove-Item -Recurse -Force ".convex" -ErrorAction SilentlyContinue

# 3. Clean any temp files
Write-Host "Cleaning temp files..." -ForegroundColor Yellow
Get-ChildItem -Path . -Filter "*.tmp" -Recurse -Force -ErrorAction SilentlyContinue | Remove-Item -Force

# 4. Empty recycle bin workaround - just delete any out folders found
Write-Host "Checking for stray out folders..." -ForegroundColor Yellow
Get-ChildItem -Path . -Directory -Recurse -ErrorAction SilentlyContinue | 
    Where-Object { $_.Name -eq "out" } | 
    ForEach-Object { 
        Write-Host "Found: $($_.FullName)" -ForegroundColor Red
        Remove-Item -Recurse -Force $_.FullName 
    }

# Now deploy
Write-Host "=== DEPLOYING ===" -ForegroundColor Cyan
npx convex deploy --yes