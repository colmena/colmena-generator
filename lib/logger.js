const chalk = require('chalk')
chalk.enabled = true

const appName = chalk.yellow('[ @colmena ]')

const log = (...args) => console.log(appName,...args)

const colors = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
]

colors.forEach(
  color => (log[color] = (...str) => log(chalk[color](...str)))
)
colors.forEach(
  color => (log[color].b = (...str) => log(chalk[color].bold(...str)))
)
colors.forEach(
  color => (log[color].d = (...str) => log(chalk[color].dim(...str)))
)

module.exports = log
