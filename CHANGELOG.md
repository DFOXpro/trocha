# 0.2.2b "First step in a long road"

## Fix

- Fix domain printing multiple times in a single call

## New Features

- new separator and firstSeparator; now the result can be tokenized via SLASH `/a/b/c` (default) or DOT `a.b.c` or BACK_SLASH; intended for localization libraries and other cases.
- You can check the api doc [here (./api_doc)](https://github.com/DFOXpro/trocha/tree/develop/api_doc)

# 0.2.1 "Details of fine coquetry"

Trocha now is tested in karma and mocha, source documented in jsDoc, code cleaned by prettier, build in travisCI

Tested in:

- Node 10
- Chrom(ium)
- Firefox
- Safari
- Edge
- Ie11

Build now runs in

- Windows(10)
- MacOS
- Linux

## New Features

- new idMode; now id can be {myId} or :myId (default); intended for libraries like CanJS
- You can check the build and test process in travisCI

# 0.2.0 Big refactor

Trocha was rewritten with ECMAScript (6/7/8/Next) in mind. Now Trocha is a class, a module

## New Features

- Can be imported with `import {Trocha} from 'trocha'` via `npm`
- Alias now use path behavior, so now it supports child and parent routes, query, fragment and many more
- Scopes now offers a more potent behavior
- Custom selector now apply across the trocha object

### Solved issues

- #1 alias routes must provide a path function
- #4 customSelector must work with routes attributes

## Breaking Changes

- Now Trocha is a class and it create objects so:

```js
// Before
const myRoute = trocha()
// Now
const myRoute = new Trocha()
```

- Alias now use path

```js
// Before
console.log(myRoute.myAlias) // "anAlias"
console.log(myRoute.myAlias.path) // Error: path not found
// Now
console.log(myRoute.myAlias) // object
console.log(myRoute.myAlias.path()) //  "anAlias"
```

- Trocha dist files difersify

```html
<!-- Before -->
<script src="https://<aCDN>/trocha/0.1.3/dist/trocha.min.js"></script>
<!-- Now -->
<script src="https://<aCDN>/trocha/0.2.0/dist/trocha_library.min.js"></script>
<!-- Or better use your favorite module bundler like ParcelJS or Webpack -->
```

## Removed Deprecations

- Now we are in `npm`; we will be still supporting `bower` build but not recommended
- Any base resource path calling now pop a warning of depreciation, in future releases the base resource route will not offer path... like a scope
