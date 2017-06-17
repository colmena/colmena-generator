const path = require('path')
const log = require('../lib/logger')

const { createActionsArray, moduleNames } = require('../lib/functions')

const { directory, input } = require('../lib/inputs')

const generatorName = 'api-module'
const description = 'Generate a LoopBack module for @colmena/api'

module.exports = function(plop) {
  const basePath = plop.getDestBasePath()
  const prompts = [
    input('name', 'Name:', true),
    directory('path', 'Path:', basePath),
  ]

  const actions = data => {
    const targetPath = path.join(data.path, data.moduleFileName)
    const actions = createActionsArray(generatorName)

    data = moduleNames(data)

    // These are the handlers for each of the moduleItems we can generate
    const handlers = {
      indexJs: () => {
        log.white.b('Adding index.js...')
        actions.addFile('index.js', targetPath, 'index.js')
      },
      packageJson: () => {
        log.white.b('Adding package.json...')
        actions.addFile('package.json', targetPath, 'package.json')
      },
      sampleData: () => {
        log.white.b('Adding sample-data/sample-data.json...')
        actions.addFile('sample-data/sample-data.json', targetPath, 'sample-data/sample-data.json')
      },
      commonModels: () => {
        log.white.b('Adding common/models/model.json...')
        actions.addFile(
          'common/models/model.json',
          targetPath,
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
