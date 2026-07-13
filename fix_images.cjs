const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      content = content.replace(/<img([^>]*)src=\{([a-zA-Z0-9_]+)\}([^>]*)>/g, (match, p1, p2, p3) => {
        if (!p2.includes('.')) {
          return `<img${p1}src={${p2}.src}${p3}>`;
        }
        return match;
      });
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'src'));
console.log('Fixed images');
