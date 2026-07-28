const fs = require('fs');
const path = require('path');

const map = {
  // King Roar additional
  'cpvc-ball-valve': 'c:/Users/meetk/OneDrive/Desktop/gravity/public/images/king roar/king roar/04.jpg',
  'cp-extension-nipples': 'c:/Users/meetk/OneDrive/Desktop/gravity/public/images/king roar/king roar/44.jpg',
};

const destDir = 'c:/Users/meetk/OneDrive/Desktop/gravity/public/images/products';

Object.keys(map).forEach(slug => {
  const src = map[slug];
  const ext = path.extname(src);
  const dest = path.join(destDir, `${slug}${ext}`);
  
  console.log(`Copying ${src} to ${dest}`);
  fs.copyFileSync(src, dest);
});

// Update site-data.ts
const siteDataPath = 'c:/Users/meetk/OneDrive/Desktop/gravity/src/lib/site-data.ts';
let siteData = fs.readFileSync(siteDataPath, 'utf8');

Object.keys(map).forEach(slug => {
  const ext = path.extname(map[slug]);
  const regex = new RegExp(`images/products/${slug}\\.(png|jpg|jpeg)`, 'g');
  siteData = siteData.replace(regex, `images/products/${slug}${ext}`);
});

fs.writeFileSync(siteDataPath, siteData);
console.log('Updated site-data.ts for remaining products');
