const countries = require('./countryCodes')
const { flag } = require('country-code-emoji')

module.exports = countries.map(({ code, name }) => ({
  code,
  name,
  flag: flag(code)
}))