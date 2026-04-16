const fs = require('fs');
const path = require('path');

function clean(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(item => {
    const itemPath = path.join(dir, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      if (item === 'out') {
        console.log('Removing:', itemPath);
        fs.rmSync(itemPath, { recursive: true, force: true });
      } else {
        clean(itemPath);
      }
    } else if (item === 'mutations.js' || item === 'queries.js') {
      console.log('Removing:', itemPath);
      fs.unlinkSync(itemPath);
    }
  });
}

clean('.convex');
console.log('Done');