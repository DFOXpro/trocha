# TO DOs in TrochaJS

## Fix IE test errors

- IE 11.0.0 (Windows 10.0.0) Trocha JS Routes List engine Route types should create an alias(route type alias) FAILED
  expected '/a.flash/alias' to equal 'a.flash/alias'
  Error
  at AssertionError (node_modules/chai/chai.js:9449:7)
  at Assertion.prototype.assert (node_modules/chai/chai.js:239:7)
  at assert.equal (node_modules/chai/chai.js:4306:5)
  at Anonymous function (test/v2/librarySpec.babeled.js:399:9)
- IE 11.0.0 (Windows 10.0.0) Trocha JS Routes List engine Solve issues 1: alias routes must provide a path funtion FAILED
  expected '/hi' to equal 'hi'
  Error
  at AssertionError (node_modules/chai/chai.js:9449:7)
  at Assertion.prototype.assert (node_modules/chai/chai.js:239:7)
  at assert.equal (node_modules/chai/chai.js:4306:5)
  at Anonymous function (test/v2/librarySpec.babeled.js:694:9)
- IE 11.0.0 (Windows 10.0.0) Trocha JS Routes List engine 0.2.1 idMode Custom IdMode should works with alias FAILED
  expected '/theAlias/{aaId}' to equal 'theAlias/{aaId}'
  Error
  at AssertionError (node_modules/chai/chai.js:9449:7)
  at Assertion.prototype.assert (node_modules/chai/chai.js:239:7)
  at assert.equal (node_modules/chai/chai.js:4306:5)
  at Anonymous function (test/v2/librarySpec.babeled.js:804:11)

* 1.0 version
* Error for missing params
* More useful Scope
  _ namespace
  _ Shallow somethig
* Subdomains
* Nested Resources
* Resource modes (singular, api, client)
* Changelog
  _ in package
  _ in github releases
* Documentation
  _ Usage for 0.2
  _ warnings
  _ errors
  _ localization
  _ clone gh-pages for this repo
  _ Examples
  _ React
  _ Vue
  _ DoneJS
  _ Angular 2^n \* JSDoc for 0.2
* Helpers
  _ Vanilla
  _ React
  _ Vue
  _ DoneJS \* Angular 2^n
* Better minimization & transpillation (clousure?)
* Real logo
