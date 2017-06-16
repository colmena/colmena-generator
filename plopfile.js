'use strict'

const path = require('path')
const log = require('./lib/logger')
const { branding } = require('./lib/functions')

module.exports = function(plop) {
  // Show branding
  branding()

  // Load the generators
  plop.load('./templates/admin-module.js')
}
