/**
 * NamCompTech - Production Build Script
 * Copies all static site files into the dist/ folder for Hostinger deployment.
 */

const fs = require('fs');
const path = require('path');

const SRC = __dirname;
const DIST = path.join(__dirname, 'dist');

// Files and folders to include in the production build
const INCLUDE_FILES = [
  'index.html',
  'about.html',
  'account.html',
  'admin.html',
  'cart.html',
  'checkout.html',
  'contact.html',
  'product.html',
  'shop.html',
  'wishlist.html',
  'styles.css',
  'app.js',
  'data.js',
  'favicon.ico',
];

const INCLUDE_DIRS = ['assets'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// ─── Build ────────────────────────────────────────────────────────────────────

console.log('\n🚀  NamCompTech — Production Build\n');

// Clean dist/
if (fs.existsSync(DIST)) {
  fs.rmSync(DIST, { recursive: true, force: true });
  console.log('  🗑   Cleaned existing dist/');
}
fs.mkdirSync(DIST, { recursive: true });

// Copy individual files
for (const file of INCLUDE_FILES) {
  const src = path.join(SRC, file);
  if (fs.existsSync(src)) {
    copyFile(src, path.join(DIST, file));
    console.log(`  ✅  ${file}`);
  } else {
    console.warn(`  ⚠️   Skipped (not found): ${file}`);
  }
}

// Copy directories
for (const dir of INCLUDE_DIRS) {
  const src = path.join(SRC, dir);
  if (fs.existsSync(src)) {
    copyDir(src, path.join(DIST, dir));
    console.log(`  📁  ${dir}/`);
  } else {
    console.warn(`  ⚠️   Skipped (not found): ${dir}/`);
  }
}

console.log(`\n✨  Build complete! Files are in:\n    ${DIST}\n`);
