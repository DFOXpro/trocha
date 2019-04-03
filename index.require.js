'use strict'

var _Trocha
if (process.env.NODE_ENV === 'production') {
	_Trocha = require('./dist/trocha_module.min.js')
} else {
	_Trocha = require('./dist/trocha_module.babeled.js')
}

// exports = _Trocha.Trocha // Like export default
exports.Trocha = _Trocha.Trocha
exports.Route = _Trocha.Route
exports.Alias = _Trocha.Alias
exports.Resource = _Trocha.Resource
exports.Scope = _Trocha.Scope
