const fs = require('fs');
const path = require('path');

const filesToFix = [
  'src/components/site/Footer.tsx',
  'src/components/site/Header.tsx'
];

for (const file of filesToFix) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/src=\{logo\}/g, 'src={logo.src}');
    fs.writeFileSync(fullPath, content);
    console.log('Fixed logo in ' + file);
  }
}
