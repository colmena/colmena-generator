const path = require('path')
const log = require('../lib/logger')

const { moduleNames } = require('../lib/functions')

const { input } = require('../lib/inputs')

const generatorName = 'generator'
const description = 'Generate a generator'

module.exports = function(plop) {
  const basePath = plop.getDestBasePath()
  const targetPath = path.join(basePath, 'templates')

  const prompts = [input('name', 'Name:', true)]

  const actions = data => {
    const actions = []

    data = moduleNames(data)

    // Push and add action to the actions array, prepend target and template path
    const addFile = (templateFile, ...targetFiles) =>
      actions.push({
        type: 'add',
        templateFile: path.join(generatorName, templateFile),
        path: path.join(...targetFiles),
      })

    // These are the handlers for each of the moduleItems we can generate
    const handlers = {
      packageJson: () => {
        log.white.b('Adding package.json...')
        addFile('package.json', `${targetPath}/${data.moduleFileName}/package.json`)
      },
      generatorJs: () => {
        log.white.b('Adding generator.js...')
        addFile('generator.js.hbs', `${targetPath}/${data.moduleFileName}.js`)
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
