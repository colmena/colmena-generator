const path = require('path')
const log = require('../lib/logger')

const {createActionsArray, moduleNames} = require('../lib/functions')

const {input} = require('../lib/inputs')

const generatorName = 'admin-module'
const description = 'Generate a admin-module'

module.exports = function (plop) {
  const basePath = plop.getDestBasePath()
  const prompts = [
    input('name', 'Name:', true),
  ]

  const actions = data => {
    const targetPath = path.join(basePath, 'out')
    const actions = createActionsArray(generatorName)

    data = moduleNames(data)

    // These are the handlers for each of the moduleItems we can generate
    const handlers = {
      jsonFiles: () => {
        log.white.b('Adding package.json...')
        actions.addFile('package.json', targetPath, `${data.moduleFileName}/package.json`)
        log.white.b('Adding tsconfig.json...')
        actions.addFile('tsconfig.json', targetPath, `${data.moduleFileName}/tsconfig.json`)
      },
      dotFiles: () => {
        log.white.b('Adding .npmrc...')
        actions.addFile('.npmrc', targetPath, `${data.moduleFileName}/.npmrc`)
      },
      tsFiles: () => {
        log.white.b('Adding index.ts...')
        actions.addFile('index.ts', targetPath, `${data.moduleFileName}/index.ts`)
        log.white.b('Adding src/index.ts...')
        actions.addFile('src/index.ts', targetPath, `${data.moduleFileName}/src/index.ts`)
        log.white.b('Adding src/module.ts...')
        actions.addFile('src/module.ts', targetPath, `${data.moduleFileName}/src/${data.moduleFileName}.module.ts`)
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
