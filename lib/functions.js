const chalk = require('chalk')

const header = `             .__
  ____  ____ |  |   _____   ____   ____ _____ @
_/ ___\\/  _ \\|  |  /     \\_/ __ \\ /    \\\\__  \\
\\  \\__(  <_> )  |_|  Y Y  \\  ___/|   |  \\/ __ \\_
 \\___  >____/|____/__|_|  /\\___  >___|  (____  /
     \\/    GENERATOR    \\/     \\/     \\/     \\/`
const subHeader = `                      @colmena/colmena-generator\n`

const branding = () => {
  console.log(chalk.yellow.bold(header))
  console.log(chalk.yellow.dim(subHeader))
}

module.exports = {
  branding,
}