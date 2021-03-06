const path = require('path')
const log = require('../lib/logger')

const { createActionsArray, moduleNames } = require('../lib/functions')

const { checkbox, directory, input } = require('../lib/inputs')

const generatorName = 'angular-module'
const description = 'Generate an Angular module for @colmena/admin'

module.exports = function(plop) {
  const basePath = plop.getDestBasePath()
  const prompts = [
    input('module', 'Module:', true),
    checkbox('moduleItems', 'Select the items you want to include:', [
      { name: 'Service', value: 'service', checked: true },
      { name: 'Resolvers', value: 'resolvers', checked: true },
      { name: 'Routes', value: 'routes', checked: true },
      { name: 'Containers', value: 'containers', checked: true },
      { name: 'Components', value: 'components', checked: true },
    ]),
    directory('path', 'Path:', basePath),
  ]

  const actions = data => {
    const targetPath = data.module
    const actions = createActionsArray(generatorName)

    data = moduleNames(data)

    // These are the handlers for each of the moduleItems we can generate
    const handlers = {
      service: () => {
        log.white.b(`Adding ${data.moduleFileNamePlural}.service.ts...`)
        actions.addFile(
          'service.hbs',
          targetPath,
          `${data.moduleFileNamePlural}.service.ts`
        )
      },
      resolvers: () => {
        log.white.b(`Adding ${data.moduleFileNamePlural}.resolvers.ts...`)
        actions.addFile(
          'resolvers.hbs',
          targetPath,
          `${data.moduleFileNamePlural}.resolvers.ts`
        )
      },
      module: () => {
        log.white.b(`Generating Angular Module`)
        actions.addFile(
          'module.hbs',
          targetPath,
          `${data.moduleFileNamePlural}.module.ts`
        )
      },
      routes: () => {
        log.white.b(`Adding ${data.moduleFileNamePlural}.routes.ts...`)
        actions.addFile(
          'routes.hbs',
          targetPath,
          `${data.moduleFileNamePlural}.routes.ts`
        )
      },
      components: () => {
        const components = ['form', 'header', 'tabs']

        components.forEach(component => {
          log.white.b(
            `Adding components/${data.moduleFileName}-${component}.component.ts...`
          )
          actions.addFile(
            `components/${component}.hbs`,
            targetPath,
            `components/${data.moduleFileName}-${component}.component.ts`
          )
        })
      },
      containers: () => {
        const containers = ['detail', 'list']

        containers.forEach(container => {
          log.white.b(
            `Adding containers/${data.moduleFileName}-${container}.component.ts...`
          )
          actions.addFile(
            `containers/${container}.hbs`,
            targetPath,
            `containers/${data.moduleFileName}-${container}.component.ts`
          )
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

  plop.setGenerator(generatorName, { description, prompts, actions })
}
