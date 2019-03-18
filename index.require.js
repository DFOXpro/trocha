'use strict';

var _Trocha;
if (process.env.NODE_ENV === 'production') {
  _Trocha = require('./dist/trocha_module.min.js');
	
} else {
  _Trocha = require('./dist/trocha_module.babeled.js');
}

exports.Trocha = _Trocha.Trocha;
