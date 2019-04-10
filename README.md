# TrochaJS

**TLDR** It replace long, ugly, repetitibe url strings with clean objects

[![MPL license](https://img.shields.io/npm/l/trocha.svg?style=plastic&logo=Mozilla)](https://www.mozilla.org/en-US/MPL/2.0/FAQ)
[![npm version](https://img.shields.io/npm/v/trocha.svg?style=plastic&logo=npm)](https://www.npmjs.com/package/trocha)

[![Commits since release](https://img.shields.io/github/commits-since/DFOXpro/trocha/0.2.0.svg?style=plastic&logo=Github)]()
[![Commits since previous release](https://img.shields.io/github/commits-since/DFOXpro/trocha/0.1.3.svg?style=plastic&logo=Github)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=plastic&logo=Github)](http://makeapullrequest.com)

<!-- @TODO
[![Code Climate](https://img.shields.io/codeclimate/github/DFOXpro/trocha.svg?style=plastic)](https://codeclimate.com/github/DFOXpro/trocha)
-->

[![npm downloads](https://img.shields.io/npm/dm/trocha.svg?style=plastic)](https://npmcharts.com/compare/trocha?minimal=true)
[![Build Status](https://img.shields.io/travis/DFOXpro/trocha.svg?logo=Travis%20CI&logoColor=FFFFFF&style=plastic)](https://travis-ci.org/DFOXpro/trocha)
[![Dependency Status](https://img.shields.io/david/DFOXpro/trocha.svg?style=plastic)](https://david-dm.org/DFOXpro/trocha)
[![devDependency Status](https://img.shields.io/david/dev/DFOXpro/trocha.svg?style=plastic)](https://david-dm.org/DFOXpro/trocha#info=devDependencies)

[![Test FX](https://img.shields.io/badge/asserts-173/173-brightgreen.svg?style=plastic&logo=Mozilla%20Firefox)](https://github.com/DFOXpro/trocha/tree/master/src/test)
[![Test Chromium](https://img.shields.io/badge/asserts-173/173-brightgreen.svg?style=plastic&logo=Google%20Chrome)](https://github.com/DFOXpro/trocha/tree/master/src/test)
[![Test Edge](https://img.shields.io/badge/asserts-173/173-brightgreen.svg?style=plastic&logo=Microsoft%20Edge)](https://github.com/DFOXpro/trocha/tree/master/src/test)
[![Test IE](https://img.shields.io/badge/11%20asserts-170/173-brightgreen.svg?style=plastic&logo=Internet%20explorer&color=important)](https://github.com/DFOXpro/trocha/tree/master/src/test)
[![Test Node](https://img.shields.io/badge/asserts-173/173-brightgreen.svg?style=plastic&logo=Node.js)](https://github.com/DFOXpro/trocha/tree/master/src/test)

[![Contact info](https://img.shields.io/badge/contact-@DFOXpro-informational.svg?style=plastic&logo=Twitter)](https://twitter.com/dfoxpro)
[![Share info](https://img.shields.io/badge/share-%23TrochaJS-informational.svg?style=plastic&logo=Twitter)](https://twitter.com/hashtag/TrochaJS)

An standalone/agnostic library to print valid URLs, ideal for RESTful & SPA frontEnd big projects.

## Why this library exist

This library take inspiration from Ruby routing system, where you describe the routes via a simple name tree and call those routes via dinamic function naming, preventing use of string in views and controllers.

> Ugly code example

```javascript
theRoute =
	'https://my.domain.com.co/product/' +
	myProduct.id +
	'/buy' +
	'?quantity=' +
	sell.quantity
```

> With Trocha

```javascript
theRoute = myRoutes.product.buy.path({
	product_id: myProduct.id,
	query: { quantity: sell.quantity }
})
```

> This will print

```bash
https://my.domain.com.co/product/<product_id>/buy?quantity=<sell.quantity>
```

Please see the full docs at [here: https://dfoxpro.github.io/trochaJS](https://dfoxpro.github.io/trochaJS)
