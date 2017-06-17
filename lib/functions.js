const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const header = `             .__
  ____  ____ |  |   _____   ____   ____ _____ @
_/ ___\\/  _ \\|  |  /     \\_/ __ \\ /    \\\\__  \\
\\  \\__(  <_> )  |_|  Y Y  \\  ___/|   |  \\/ __ \\_
 \\___  >____/|____/__|_|  /\\___  >___|  (____  /
     \\/    GENERATOR    \\/     \\/     \\/     \\/`
const subHeader = `                      @colmena/colmena-generator\n`

const branding = () => {
  console.log(chalk.yellow.bold(header))
  console.log(chalk.yellow.dim(subHeader))
}

const isDir = p => fs.lstatSync(p).isDirectory()
const readDir = p => fs.readdirSync(p)
const getFiles = p => readDir(p).filter(f => !isDir(path.join(p, f)))

const getGenerators = () => {
  const templatePath = path.join(__dirname, '..', 'templates')

  return getFiles(templatePath).map(files => files.replace('.js', ''))
}

module.exports = {
  branding,
  getGenerators,
}
