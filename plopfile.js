'use strict'

// const _ = require('lodash')
// _.mixin(require('lodash-inflection'))

const path = require('path')

const { branding } = require('./lib/functions')

const generators = {
  'angular-module': './templates/angular-module',
  'api-module': './templates/api-module',
}

module.exports = function(plop) {
  // Show branding
  branding()

  // Add plop helper functions
  plop.addHelper('absPath', p => path.resolve(plop.getDestBasePath(), p))

  // Add plop prompt types
  plop.addPrompt('directory', require('inquirer-directory'))

  // Load the generators
  Object.keys(generators).forEach(generator => plop.load(generators[generator]))
}
