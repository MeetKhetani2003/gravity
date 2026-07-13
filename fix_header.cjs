const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/site/Header.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace('import { useEffect, useState } from "react";', 'import { useEffect, useState } from "react";\nimport { usePathname } from "next/navigation";');
content = content.replace(/location\.pathname/g, 'pathname');

fs.writeFileSync(filePath, content);
console.log('Fixed Header');
