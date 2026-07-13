const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/app/about/page.tsx',
  'src/app/applications/page.tsx',
  'src/app/downloads/page.tsx',
  'src/app/quality/page.tsx'
];

for (const file of filesToFix) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/to:\s*([`'"])/g, 'href: $1');
    fs.writeFileSync(fullPath, content);
    console.log('Fixed to: in ' + file);
  }
}
