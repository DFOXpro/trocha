## New Features

- new idMode; now id can be {myId} or :myId (default); intended for libraries like CanJS

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
