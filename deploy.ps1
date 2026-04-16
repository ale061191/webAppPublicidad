# Clean all caches and use different output dir
$env:CONVEX_OUT_DIR = "convex_dist"
Remove-Item -Recurse -Force .convex -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules/.cache -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force convex_dist -ErrorAction SilentlyContinue
npx convex deploy --yes