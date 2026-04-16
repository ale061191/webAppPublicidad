# Clean and Deploy Script
Write-Host "Cleaning caches..."
Remove-Item -Recurse -Force .convex -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue

# Set custom out directory
$env:CONVEX_OUT_DIR = "dist"

Write-Host "Deploying to Convex..."
npx convex deploy --yes