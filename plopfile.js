'use strict'

const path = require('path')

const { branding } = require('./lib/functions')

const generators = {
  'admin-module': require('./templates/admin-module'),
  'api-module': require('./templates/api-module'),
}

module.exports = function(plop) {
  // Show branding
  branding()

  // Add plop helper functions
  plop.addHelper('absPath', p => path.resolve(plop.getDestBasePath(), p))

  // Add plop prompt types
  plop.addPrompt('directory', require('inquirer-directory'))

  // Load the generators
  Object.keys(generators).forEach(generator => {
    plop.setGenerator(generator, generators[generator])
  })


  console.log(plop.getDestBasePath())

}
