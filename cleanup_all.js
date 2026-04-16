const fs = require('fs');
const p = require('path');

const base = "C:/Users/Voltaje Plus/Documents/webAppPublicidad-main";

const duplicates = [
    "webAppabilidad-main",
    "webAppacidad-main",
    "webAppcapacidad-main", 
    "webAppocidad-main"
];

duplicates.forEach(dir => {
    const fullPath = p.join(base, dir);
    if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath, {recursive: true, force: true});
        console.log("Deleted:", dir);
    }
});

// Delete package-lock.json at base
const pkgLock = p.join(base, "package-lock.json");
if (fs.existsSync(pkgLock)) {
    fs.unlinkSync(pkgLock);
    console.log("Deleted package-lock.json");
}

// Clean .convex in main project
const main = p.join(base, "webAppPublicidad-main", ".convex");
if (fs.existsSync(main)) {
    fs.rmSync(main, {recursive: true, force: true});
    console.log("Cleaned .convex in main");
}

console.log("ALL CLEANED!");