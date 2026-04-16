const fs = require('fs');
const path = require('path');

function cleanDir(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(item => {
    const itemPath = path.join(dir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      if (item === 'out') {
        fs.rmSync(itemPath, { recursive: true, force: true });
      } else {
        cleanDir(itemPath);
      }
    }
  });
}

// Clean all directories
['.convex', 'node_modules/.cache', '.next'].forEach(d => {
  try { fs.rmSync(d, { recursive: true, force: true }); } catch(e) {}
});

console.log('All caches cleared');