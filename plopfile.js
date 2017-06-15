'use strict'
const path = require('path')
const log = require('./logger')
const chalk = require('chalk')
chalk.enabled = true
const header = `
             .__
@ ____  ____ |  |   _____   ____   ____ _____
_/ ___\\/  _ \\|  |  /     \\_/ __ \\ /    \\\\__  \\
\\  \\__(  <_> )  |_|  Y Y  \\  ___/|   |  \\/ __ \\_
 \\___  >____/|____/__|_|  /\\___  >___|  (____  /
     \\/  GENERATOR      \\/     \\/     \\/     \\/`
const subHeader = `                   @colmena/colmena-generator \n`

module.exports = function(plop) {
  // COLMENA CONSOLE ART
  // log header
  console.log(chalk.cyan(header))
  console.log(chalk.red(subHeader))
  // HELPERS
  // plop helper functions
  plop.addHelper('absPath', p => {
    return path.resolve(plop.getPlopfilePath(), p)
  })
  // ACTION TYPES
  // plop action types
  plop.setActionType('writeModule', function(answers, config, plop) {
    return log.info(answers)
  })
  // GENERATORS
  // plop generators
  plop.setGenerator('admin-module', {
    description: 'Generate an Angular module for @colmena/admin',
    // PROMPT FOR INPUTS
    // plop (inquirer) prompts
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'Module Name:',
        validate: function(value) {
          if (/.+/.test(value)) {
            return true
          }
          return 'Module Name is required'
        },
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'Primary Model:',
        validate: function(value) {
          if (/.+/.test(value)) {
            return true
          }
          return 'Primary Model is required'
        },
      },
      {
        type: 'checkbox',
        name: 'moduleItems',
        message: 'Select the items you want to include:',
        choices: [
          { name: 'Service', value: 'service', checked: true },
          { name: 'Resolvers', value: 'resolvers', checked: true },
          { name: 'Routes', value: 'routes', checked: true },
          { name: 'Containers', value: 'containers', checked: true },
          { name: 'Components', value: 'components', checked: true },
        ],
      },
    ],
    // PROCESS ACTIONS
    // plop actions
    actions: function(data) {
      const actions = [
        {
          type: 'add',
          path:
            '{{ lowerCase moduleName }}/{{ dashCase moduleName }}.module.ts',
          templateFile: 'templates/admin-module/module.txt',
        },
      ]
      console.log(
        chalk.white.bgCyan(`| @colmena |`) +
          chalk.green(` Generating Angular Module`)
      )
      if (data.moduleItems.indexOf('service') > -1) {
        log.info('Adding Service...')
        actions.push({
          type: 'add',
          path:
            '{{ lowerCase moduleName }}/{{ dashCase moduleName }}.service.ts',
          templateFile: 'templates/admin-module/service.txt',
        })
      }
      if (data.moduleItems.indexOf('resolvers') > -1) {
        log.info('Adding Resolvers...')
        actions.push({
          type: 'add',
          path:
            '{{ lowerCase moduleName }}/{{ dashCase moduleName }}.resolvers.ts',
          templateFile: 'templates/admin-module/resolvers.txt',
        })
      }
      if (data.moduleItems.indexOf('routes') > -1) {
        log.info('Adding Routes...')
        actions.push({
          type: 'add',
          path:
            '{{ lowerCase moduleName }}/{{ dashCase moduleName }}.routes.ts',
          templateFile: 'templates/admin-module/routes.txt',
        })
      }

      return actions
    },
  })

  plop.setGenerator('api-module', {
    description: 'Generate a LoopBack module for @colmena/api',
    prompts: [],
    actions: function(data) {
      var actions = []

      return actions
    },
  })
}
