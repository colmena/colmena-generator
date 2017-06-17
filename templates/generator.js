const path = require('path')
const log = require('../lib/logger')

const { createActionsArray, moduleNames } = require('../lib/functions')

const { input } = require('../lib/inputs')

const generatorName = 'generator'
const description = 'Generate a generator'

module.exports = function(plop) {
  const basePath = plop.getDestBasePath()
  const prompts = [
    input('name', 'Name:', true)
  ]

  const actions = data => {
    const targetPath = path.join(basePath, 'templates')
    const actions = createActionsArray(generatorName)

    data = moduleNames(data)

    // These are the handlers for each of the moduleItems we can generate
    const handlers = {
      packageJson: () => {
        log.white.b('Adding package.json...')
        actions.addFile('package.json', `${targetPath}/${data.moduleFileName}/package.json`)
      },
      generatorJs: () => {
        log.white.b('Adding generator.js...')
        actions.addFile('generator.js.hbs', `${targetPath}/${data.moduleFileName}.js`)
      },
    }

    const createActions = ['packageJson', 'generatorJs']

    // Loop over all the selected moduleItems and execute their handler.
    createActions.forEach(
      action =>
        handlers[action]
          ? handlers[action]()
          : log.red.b(`Handler for ${action} not defined.`)
    )

    return actions
  }

  plop.setGenerator(generatorName, { description, prompts, actions })
}
