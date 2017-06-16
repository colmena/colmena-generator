const chalk = require('chalk')
const path = require('path')
const log = require('../lib/logger')

const {checkbox, input} = require('../lib/inputs')

const description = 'Generate an Angular module for @colmena/admin';

const prompts = [
  input('model', 'Model:', true),
  checkbox('moduleItems', 'Select the items you want to include:', [
    {name: 'Service', value: 'service', checked: true},
    {name: 'Resolvers', value: 'resolvers', checked: true},
    {name: 'Routes', value: 'routes', checked: true},
    {name: 'Containers', value: 'containers', checked: true},
    {name: 'Components', value: 'components', checked: true},
  ]),
  // directory('path', 'Path:', plop.getDestBasePath()),
]

const templatePath = 'templates/admin-module'

const actions = (data) => {
  const actions = []

  const modelName = '{{ dashCase model }}'
  const targetPath = modelName

  // Push and add action to the actions array, prepend target and template path
  const addFile = (templateFile, ...targetFiles) => actions.push({
    type: 'add',
    templateFile: path.join(templatePath, templateFile),
    path: path.join(targetPath, ...targetFiles),
  })


  // These are the handlers for each of the moduleItems we can generate
  const handlers = {
    service: () => {
      log.white.b('Adding Service...')
      addFile('service.txt', `${modelName}.service.ts`)
    },
    resolvers: () => {
      log.white.b('Adding Resolvers...')
      addFile('resolvers.txt', `${modelName}.resolvers.ts`)
    },
    module: () => {
      log.white.b(`Generating Angular Module`)
      addFile('module.txt', `${modelName}.module.ts`)
    },
    routes: () => {
      log.white.b('Adding Routes...')
      addFile('routes.txt', `${modelName}.routes.ts`)
    },
    components: () => {
      log.white.b('Adding Components...')
      const components = ['form', 'header', 'tabs']

      components.forEach(component => {
        addFile(`components/${component}.txt`, `components/${modelName}.${component}.ts`)
      })
    },
    containers: () => {
      log.white.b('Adding Containers...')
      const containers = ['detail', 'list']

      containers.forEach(container => {
        addFile(`containers/${container}.txt`, `containers/${modelName}.${container}.ts`)
      })
    },
  }
  // Always create the module item first
  data.moduleItems.unshift('module')

  // Loop over all the selected moduleItems and execute their handler.
  data.moduleItems.forEach(
    moduleItem =>
      handlers[moduleItem]
        ? handlers[moduleItem]()
        : log.red.b(`Handler for ${moduleItem} not defined.`)
  )

  return actions
}


module.exports = {description, prompts, actions}
