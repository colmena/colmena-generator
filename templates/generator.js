const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const hbs = require('handlebars')

const log = require('../lib/logger')
const { kebabCase, camelCase } = require('lodash')
const { checkbox, directory, input } = require('../lib/inputs')

const template = 'templates/generator/package.hbs'

module.exports = function(plop) {
  const generatorName = 'colmena-generator'
  const description = 'Generate a Colmena generator'

  // Add plop helper functions
  plop.addHelper('absPath', p => path.resolve(plop.getDestBasePath(), p))

  const prompts = [
    input('name', 'Generator Name:', true),
    directory('path', 'Path:', plop.getDestBasePath()),
  ]

  const actions = data => {
    const actions = []

    const templateInstance = fs.readFileSync(template)
    const fileContent = plop.renderString(templateInstance.toString(), data)
    log.white.b('Generating package.json...')
    log.gray.d(fileContent)

    actions.push({
      type: 'add',
      path: '{{ absPath path }}/{{ dashCase name }}/package.json',
      template: fileContent,
    })

    return actions
  }
  plop.setGenerator(generatorName, { description, prompts, actions })
}
