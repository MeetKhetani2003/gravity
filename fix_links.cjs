const fs = require('fs');
const path = require('path');

function replaceToWithHref(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');
  content = content.replace(/\{to\}/g, '{href}');
  content = content.replace(/to: string/g, 'href: string');
  content = content.replace(/to\s*=\s*\{/g, 'href={');
  content = content.replace(/item\.to/g, 'item.href');
  fs.writeFileSync(filePath, content);
  console.log('Fixed ' + filePath);
}

replaceToWithHref(path.join(__dirname, 'src/components/site/Header.tsx'));
replaceToWithHref(path.join(__dirname, 'src/components/site/Footer.tsx'));
replaceToWithHref(path.join(__dirname, 'src/components/site/CTASection.tsx'));
