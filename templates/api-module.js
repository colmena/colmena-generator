const path = require('path')
const log = require('../lib/logger')

const { moduleNames } = require('../lib/functions')

const { directory, input } = require('../lib/inputs')

module.exports = function(plop) {
  const generatorName = 'api-module'
  const description = 'Generate a LoopBack module for @colmena/api'

  const prompts = [
    input('name', 'Name:', true),
    directory('path', 'Path:', plop.getDestBasePath()),
  ]

  const actions = data => {
    const actions = []

    data = moduleNames(data)

    // Push and add action to the actions array, prepend target and template path
    const addFile = (templateFile, ...targetFiles) =>
      actions.push({
        type: 'add',
        templateFile: path.join(generatorName, templateFile),
        path: path.join(data.modulePath, data.moduleFileName, ...targetFiles),
      })

    // These are the handlers for each of the moduleItems we can generate
    const handlers = {
      indexJs: () => {
        log.white.b('Adding index.js...')
        addFile('index.js', 'index.js')
      },
      packageJson: () => {
        log.white.b('Adding package.json...')
        addFile('package.json', 'package.json')
      },
      sampleData: () => {
        log.white.b('Adding sample-data/sample-data.json...')
        addFile('sample-data/sample-data.json', 'sample-data/sample-data.json')
      },
      commonModels: () => {
        log.white.b('Adding common/models/model.json...')
        addFile(
          'common/models/model.json',
          `common/models/${data.moduleFileName}.json`
        )
      },
    }

    const createActions = [
      'indexJs',
      'packageJson',
      'sampleData',
      'commonModels',
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

  plop.setGenerator(generatorName, { description, prompts, actions })
}
