import { readFileSync, writeFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync('./dist/package.json').toString())
const fieldsToUpdate = ['main', 'jsnext:main', 'module', 'types']

fieldsToUpdate.forEach((field) => {
  if (packageJson[field] && packageJson[field].startsWith('dist/')) {
    packageJson[field] = packageJson[field].replace('dist/', '')
  }
})

delete packageJson.devDependencies
delete packageJson.scripts
delete packageJson.husky

writeFileSync('./dist/package.json', JSON.stringify(packageJson, undefined, 2))
