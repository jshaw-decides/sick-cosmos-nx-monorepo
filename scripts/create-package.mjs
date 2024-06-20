import fs from 'fs-extra';
import path from 'path';

// 1. Check if process.env.NAME exists
if (!process.env.NAME) {
  console.error('The NAME environment variable is required.');
  process.exit(1);
}

const NAME = process.env.NAME;
const sourceDir = path.join('.generators', 'react-package-example');
const destDir = path.join('packages', '@your-org', NAME);

// 2. Copy the directory recursively
fs.copySync(sourceDir, destDir);

// 3. Update package.json
const packageJsonPath = path.join(destDir, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

packageJson.name = `@your-org/${NAME}`;
packageJson.main = `../../../dist/packages/@your-org/${NAME}/app.js`;
packageJson.module = `../../../dist/packages/@your-org/${NAME}/app.js`;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('Directory copied and package.json updated successfully.');
