const { valueRequired } = require('./validators')

const input = (name, message, required = false) => ({
  type: 'input',
  name,
  message,
  validate: (value) => required ? valueRequired(value, name) : true,
})

const checkbox = (name, message, choices) => ({
  type: 'checkbox',
  name,
  message,
  choices,
})

const directory = (name, message, basePath) => ({
  type: 'directory',
  name,
  message,
  basePath,
})

module.exports = {
  input,
  checkbox,
  directory,
}
