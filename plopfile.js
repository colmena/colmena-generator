'use strict'

const path = require('path')
const log = require('./lib/logger')
const { branding } = require('./lib/functions')

const generators = {
  'admin-module': require('./templates/admin-module'),
  'api-module': require('./templates/api-module'),
}

module.exports = function(plop) {
  // Show branding
  branding()

  // Add plop helper functions
  plop.addHelper('absPath', p => path.resolve(plop.getPlopfilePath(), p))

  // Set plop action types
  plop.setActionType('writeModule', answers => log.info(answers))

  // Load the generators
  Object.keys(generators).forEach(generator => {
    plop.setGenerator(generator, generators[generator])
  })
}
