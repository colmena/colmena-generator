const chalk = require('chalk')
const log = require('../lib/logger')

module.exports = function(plop) {

  const name = 'api-module'
  const description = 'Generate a LoopBack module for @colmena/api'

  const prompts = []

  const actions = (data) => {
    const actions = []

    return actions
  }

  plop.setGenerator(name, {description, prompts, actions})
}
