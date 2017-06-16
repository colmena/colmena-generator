const chalk = require('chalk')
const path = require('path')
const log = require('../lib/logger')

const { input, checkbox } = require('../lib/inputs')

const templatePath = 'templates/admin-module'

const prompts = [
  input('model', 'Model:', true),
  checkbox('moduleItems', 'Select the items you want to include:', [
    { name: 'Service', value: 'service', checked: true },
    { name: 'Resolvers', value: 'resolvers', checked: true },
    { name: 'Routes', value: 'routes', checked: true },
    { name: 'Containers', value: 'containers', checked: true },
    { name: 'Components', value: 'components', checked: true },
  ]),
]

module.exports = function(plop) {
  // Add plop helper functions
  plop.addHelper('absPath', p => path.resolve(plop.getDestBasePath(), p))
  // Add plop prompt types
  plop.addPrompt('directory', require('inquirer-directory'))
  // Define plop generator
  plop.setGenerator('admin-module', {
    description: 'Generate an Angular module for @colmena/admin',
    prompts: [
      ...prompts,
      {
        type: 'directory',
        name: 'path',
        message: 'Path: ',
        basePath: plop.getDestBasePath(),
      },
    ],
    actions: function(data) {
      const actions = []
      // These are the handlers for each of the moduleItems we can generate
      const handlers = {
        service: () => {
          log.white.b('Adding Service...')
          actions.push({
            type: 'add',
            templateFile: './admin-module/service.txt',
            path: './{{ dashCase model }}/{{ dashCase model }}.service.ts',
          })
        },
        resolvers: () => {
          log.white.b('Adding Resolvers...')
          actions.push({
            type: 'add',
            templateFile: './admin-module/resolvers.txt',
            path: './{{ dashCase model }}/{{ dashCase model }}.resolvers.ts',
          })
        },
        module: () => {
          log.white.b(`Generating Angular Module`)
          actions.push({
            type: 'add',
            templateFile: './admin-module/module.txt',
            path: './{{ dashCase model }}/{{ dashCase model }}.module.ts',
          })
        },
        routes: () => {
          log.white.b('Adding Routes...')
          actions.push({
            type: 'add',
            templateFile: './admin-module/routes.txt',
            path: './{{ dashCase model }}/{{ dashCase model }}.routes.ts',
          })
        },
        components: () => {
          log.white.b('Adding Components...')
          const components = ['form', 'header', 'tabs']

          components.forEach(component => {
            actions.push({
              type: 'add',
              templateFile: `./admin-module/components/${component}.txt`,
              path:
                './{{ dashCase model }}/components/{{ dashCase model }}.' +
                  component +
                  '.ts',
            })
          })
        },
        containers: () => {
          log.white.b('Adding Containers...')
          const containers = ['detail', 'list']

          containers.forEach(container => {
            actions.push({
              type: 'add',
              templateFile: `./admin-module/containers/${container}.txt`,
              path:
                './{{ dashCase model }}/containers/{{ dashCase model }}.' +
                  container +
                  '.ts',
            })
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
    },
  })
}
