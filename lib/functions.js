const chalk = require('chalk')
const fs = require('fs')
const path = require('path')

const { kebabCase, camelCase } = require('lodash')
const changeCase = require('change-case')

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

const moduleNames = data => {
  // Create some variants of the module name
  const moduleScope = '@colmena'
  const modulePath = data.path
  const moduleName = data.module
  const moduleNamePlural = moduleName + 's'
  const moduleFileName = kebabCase(moduleName)
  const moduleFileNamePlural = kebabCase(moduleNamePlural)
  const moduleNameCamel = camelCase(moduleName)
  const moduleNameProper = changeCase.pascal(moduleName)
  const moduleNameProperPlural = changeCase.pascal(moduleNamePlural)

  // Make the variable available to the templates
  data.moduleScope = moduleScope
  data.modulePath = modulePath
  data.moduleName = moduleName
  data.moduleNamePlural = moduleNamePlural
  data.moduleFileName = moduleFileName
  data.moduleFileNamePlural = moduleFileNamePlural
  data.moduleNameCamel = moduleNameCamel
  data.moduleNameProper = moduleNameProper
  data.moduleNameProperPlural = moduleNameProperPlural

  return data
}

const createActionsArray = generatorName => {
  const actions = []

  actions.addFile = (templateFile, ...targetFiles) =>
    actions.push({
      type: 'add',
      templateFile: path.join(generatorName, templateFile),
      path: path.join(...targetFiles),
    })

  return actions
}

module.exports = {
  branding,
  createActionsArray,
  getGenerators,
  moduleNames,
}
