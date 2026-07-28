const fs = require('fs');
const data = fs.readFileSync('src/lib/site-data.ts', 'utf8');
const matches = [...data.matchAll(/image: "([^"]+\.png)"/g)];
matches.forEach(m => console.log(m[1]));
