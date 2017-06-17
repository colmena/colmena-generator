'use strict'

const path = require('path')

const { branding, getGenerators } = require('./lib/functions')

const generators = {}

getGenerators().forEach(generator => {
  generators[generator] = `./templates/${generator}`
})

module.exports = function(plop) {
  // Show branding
  branding()

  // Add plop helper functions
  plop.addHelper('absPath', p => path.resolve(plop.getDestBasePath(), p))

  // Add plop prompt types
  plop.addPrompt('directory', require('inquirer-directory'))

  console.log(plop.getDestBasePath())

  // Load the generators
  Object.keys(generators).forEach(generator => plop.load(generators[generator]))
}
