const path = require('path')
const log = require('../lib/logger')

const { moduleNames } = require('../lib/functions')

const { input } = require('../lib/inputs')

const generatorName = 'admin-module'
const description = 'Generate a admin-module'

module.exports = function (plop) {

  const basePath = plop.getDestBasePath()
  const targetPath = path.join(basePath, 'out')

  const prompts = [
    input('name', 'Name:', true),
  ]

  const actions = data => {
    const actions = []

    data = moduleNames(data)

    // Push and add action to the actions array, prepend target and template path
    const addFile = (templateFile, ...targetFiles) => actions.push({
      type: 'add',
      templateFile: path.join(generatorName, templateFile),
      path: path.join(...targetFiles),
    })

    // These are the handlers for each of the moduleItems we can generate
    const handlers = {
      jsonFiles: () => {
        log.white.b('Adding package.json...')
        addFile('package.json', `${targetPath}/${data.moduleFileName}/package.json`)
        log.white.b('Adding tsconfig.json...')
        addFile('tsconfig.json', `${targetPath}/${data.moduleFileName}/tsconfig.json`)
      },
      dotFiles: () => {
        log.white.b('Adding .npmrc...')
        addFile('.npmrc', `${targetPath}/${data.moduleFileName}/.npmrc`)
      },
      tsFiles: () => {
        log.white.b('Adding index.ts...')
        addFile('index.ts', `${targetPath}/${data.moduleFileName}/index.ts`)
        log.white.b('Adding src/index.ts...')
        addFile('src/index.ts', `${targetPath}/${data.moduleFileName}/src/index.ts`)
        log.white.b('Adding src/module.ts...')
        addFile('src/module.ts', `${targetPath}/${data.moduleFileName}/src/${data.moduleFileName}.module.ts`)
      },
    }

    const createActions = [
      'jsonFiles',
      'dotFiles',
      'tsFiles',
    ]

    // Loop over all the selected moduleItems and execute their handler.
    createActions.forEach(
      action =>
        handlers[action]
          ? handlers[action]()
          : log.red.b(`Handler for ${action} not defined.`)
    )

    return actions
  }

  plop.setGenerator(generatorName, {description, prompts, actions})
}
