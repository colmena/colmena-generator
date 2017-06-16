const chalk = require('chalk')
const path = require('path')
const log = require('../lib/logger')

const {kebabCase, camelCase} = require('lodash')

const {checkbox, directory, input} = require('../lib/inputs')

module.exports = function(plop) {

  const generatorName = 'angular-module'

  const description = 'Generate an Angular module for @colmena/admin';

  const prompts = [
    input('module', 'Module:', true),
    checkbox('moduleItems', 'Select the items you want to include:', [
      {name: 'Service', value: 'service', checked: true},
      {name: 'Resolvers', value: 'resolvers', checked: true},
      {name: 'Routes', value: 'routes', checked: true},
      {name: 'Containers', value: 'containers', checked: true},
      {name: 'Components', value: 'components', checked: true},
    ]),
    directory('path', 'Path:', plop.getDestBasePath()),
  ]

  const actions = data => {
    const actions = []

    // Create some variants of the module name
    const moduleName = data.module
    const moduleNamePlural = moduleName + 's'
    const moduleFileName = kebabCase(moduleName)
    const moduleNameCamel = camelCase(moduleName)

    // Make the variable available to the templates
    data.moduleName = moduleName
    data.moduleNamePlural = moduleNamePlural
    data.moduleFileName = moduleFileName
    data.moduleNameCamel = moduleNameCamel

    // Push and add action to the actions array, prepend target and template path
    const addFile = (templateFile, ...targetFiles) => actions.push({
      type: 'add',
      templateFile: path.join(generatorName, templateFile),
      path: path.join(moduleFileName, ...targetFiles),
    })


    // These are the handlers for each of the moduleItems we can generate
    const handlers = {
      service: () => {
        log.white.b('Adding Service...')
        addFile('service.hbs', `${moduleFileName}.service.ts`)
      },
      resolvers: () => {
        log.white.b('Adding Resolvers...')
        addFile('resolvers.hbs', `${moduleFileName}.resolvers.ts`)
      },
      module: () => {
        log.white.b(`Generating Angular Module`)
        addFile('module.hbs', `${moduleFileName}.module.ts`)
      },
      routes: () => {
        log.white.b('Adding Routes...')
        addFile('routes.hbs', `${moduleFileName}.routes.ts`)
      },
      components: () => {
        const components = ['form', 'header', 'tabs']

        components.forEach(component => {
          log.white.b(`Adding Component ${component}...`)
          addFile(`components/${component}.hbs`, `components/${moduleFileName}.${component}.component.ts`)
        })
      },
      containers: () => {
        const containers = ['detail', 'list']

        containers.forEach(container => {
          log.white.b(`Adding Container ${container}...`)
          addFile(`containers/${container}.hbs`, `containers/${moduleFileName}.${container}.component.ts`)
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

  plop.setGenerator(generatorName, {description, prompts, actions})
}
