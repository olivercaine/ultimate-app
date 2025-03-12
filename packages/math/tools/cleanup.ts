import { readFileSync, writeFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync('./dist/package.json').toString())
delete packageJson.devDependencies
delete packageJson.scripts

// TODO: remove "dist/" from following (as it's already going dist folder):
// "jsnext:main": "dist/index.js",
// "module": "dist/index.js",
// "types": "dist/index.d.ts",

writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2))
