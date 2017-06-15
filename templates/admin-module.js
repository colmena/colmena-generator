const chalk = require('chalk')
const log = require('../lib/logger')

const description = 'Generate an Angular module for @colmena/admin'

const prompts = [{
  type: 'input',
  name: 'moduleName',
  message: 'Module Name:',
  validate: (value) => {
    if (/.+/.test(value)) {
      return true
    }
    return 'Module Name is required'
  },
}, {
  type: 'input',
  name: 'modelName',
  message: 'Primary Model:',
  validate: (value) => {
    if (/.+/.test(value)) {
      return true
    }
    return 'Primary Model is required'
  },
}, {
  type: 'checkbox',
  name: 'moduleItems',
  message: 'Select the items you want to include:',
  choices: [
    {name: 'Service', value: 'service', checked: true},
    {name: 'Resolvers', value: 'resolvers', checked: true},
    {name: 'Routes', value: 'routes', checked: true},
    {name: 'Containers', value: 'containers', checked: true},
    {name: 'Components', value: 'components', checked: true},
  ],
}]

const actions = (data) => {
  const actions = [
    {
      type: 'add',
      path: '{{ lowerCase moduleName }}/{{ dashCase moduleName }}.module.ts',
      templateFile: 'templates/admin-module/module.txt',
    },
  ]

  log.green.b(`Generating Angular Module`)

  if (data.moduleItems.indexOf('service') > -1) {
    log.white('Adding Service...')
    actions.push({
      type: 'add',
      path: '{{ lowerCase moduleName }}/{{ dashCase moduleName }}.service.ts',
      templateFile: 'templates/admin-module/service.txt',
    })
  }

  if (data.moduleItems.indexOf('resolvers') > -1) {
    log.white('Adding Resolvers...')
    actions.push({
      type: 'add',
      path: '{{ lowerCase moduleName }}/{{ dashCase moduleName }}.resolvers.ts',
      templateFile: 'templates/admin-module/resolvers.txt',
    })
  }

  if (data.moduleItems.indexOf('routes') > -1) {
    log.white('Adding Routes...')
    actions.push({
      type: 'add',
      path: '{{ lowerCase moduleName }}/{{ dashCase moduleName }}.routes.ts',
      templateFile: 'templates/admin-module/routes.txt',
    })
  }

  return actions
}

module.exports = {description, prompts, actions}
