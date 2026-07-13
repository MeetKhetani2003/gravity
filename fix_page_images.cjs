const fs = require('fs');
const path = require('path');

function fixPageTsx() {
  const filePath = path.join(__dirname, 'src/app/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/src=\{kingroar\}/g, 'src={kingroar.src}');
  content = content.replace(/src=\{img\}/g, 'src={img.src || img}');
  fs.writeFileSync(filePath, content);
  console.log('Fixed page.tsx');
}

fixPageTsx();
