const fs = require('fs'); 
const data = fs.readFileSync('src/lib/site-data.ts', 'utf8'); 
['cpvc-3in1-wall-mixer-adapter', 'ptmt-connection-pipe', 'nahani-trap', 'cpvc-ball-valve', 'abs-showers', 'cp-extension-nipples'].forEach(slug => { 
  const match = data.match(new RegExp('slug: "' + slug + '",[\\s\\S]*?image: "([^"]+)"')); 
  if(match) console.log(slug, match[1]); 
});
