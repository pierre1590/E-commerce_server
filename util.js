const fs = require('fs')
const { join } = require('path')

module.exports.getFile = (path) => {
  const file = fs.readFileSync(join(process.cwd(), 'data', path), { encoding: 'utf-8' })
  return JSON.parse(file)
}

module.exports.writeFile = (path, content) => {
  fs.writeFileSync(join(process.cwd(), 'data', path), JSON.stringify(content))
}