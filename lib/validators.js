const valueRequired = (value, name) =>
  /.+/.test(value) ? true : `Input ${name} is required`

module.exports = {
  valueRequired,
}
