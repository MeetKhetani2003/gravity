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
      
      // Imports
      content = content.replace(/import\s*\{\s*[^}]*Link[^}]*\}\s*from\s*["']@tanstack\/react-router["'];?/g, 'import Link from "next/link";');
      content = content.replace(/import\s*\{\s*[^}]*useRouter[^}]*\}\s*from\s*["']@tanstack\/react-router["'];?/g, 'import { useRouter } from "next/navigation";');
      content = content.replace(/import\s*\{\s*[^}]*useRouterState[^}]*\}\s*from\s*["']@tanstack\/react-router["'];?/g, 'import { usePathname } from "next/navigation";');
      
      // Leftovers from createFileRoute
      content = content.replace(/^\s*head:\s*\(\)\s*=>\s*\(\{[\s\S]*?\}\),/gm, '');
      content = content.replace(/^\s*component:\s*[a-zA-Z0-9_]+,?/gm, '');
      content = content.replace(/^\s*loader:\s*\([^)]*\)\s*=>\s*.*\{/gm, '');
      
      // Fix duplicate export default function (my previous script bug)
      content = content.replace(/export default export default function/g, 'export default function');
      
      // In Next.js App Router, we use "use client" for components with hooks
      if ((content.includes('useState') || content.includes('useEffect') || content.includes('useRouter') || content.includes('usePathname')) && !content.includes('"use client"')) {
        content = '"use client";\n' + content;
      }
      
      fs.writeFileSync(fullPath, content);
      console.log(`Processed ${fullPath}`);
    }
  }
}

processDir(path.join(__dirname, 'src', 'app'));
processDir(path.join(__dirname, 'src', 'components'));
