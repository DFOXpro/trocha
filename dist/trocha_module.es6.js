/** @license trocha@0.2.3 - 2019-05-09
* Trocha.js 
* 
* This source code is licensed under the Mozillas Public license 2.0 found in the 
* LICENSE file in the root directory of this source tree. 
*/
/**
 * This file is intended for module enviorements
 * Works like React
 * Note we also make public a lot of const for easy usage
 */
/* Begin: src/v2/_core.js */
// Utility methods
/* Begin: src/v2/_utils.js */
let _throwError = (scope, error_text, value) => {
	class TrochaError extends Error {
		constructor(scope, error_text, value) {
			// Pass remaining arguments (including vendor specific ones) to parent constructor
			super(ERROR_HEADER + error_text)

			// Custom debugging information
			this.scope = scope
			this.value = value
		}
	}
	throw new TrochaError(scope, error_text, value)
}

let _throwWarning = (scope, warning_text, value) => {
	console.warn(WARNING_HEADER + warning_text, value || s, scope || s)
}
/* End: src/v2/_utils.js */
// Const used abroad the library
/* Begin: src/v2/_variables.js */
/*
 * Why variables are outside the Trocha class?
 * Because protected attributes are still not supported
 * and because Route share a lot of symbols with Trocha
 */

/// Utility vars
const s = '' // Force string
const DS = '$' // DEFAULT_SELECTOR

/// Input attributes
const ID = 'id'
const URL = 'url'
const NAME = 'name'
const HIDE = 'hide'
const TYPE = 'type'
const PREFIX = 'pre'
const ALIAS = 'alias'
const QUERY = 'query'
const POSTFIX = 'post'
const EXTENDED = 'ext'
const METHOD = 'method'
const DOMAIN = 'domain'
const ROUTES = 'routes'
const ID_MODE = 'idMode'
const JUST_ID = 'justId'
// const AFTER_ID = 'afterId' // FAILS & no DOCS
const FRAGMENT = 'fragment'
const RESOURCE = 'resource'
const PARENT_ID = 'parentId'
const SEPARATOR = 'separator'
const DEFAULT_ID = 'defaultId'
const ALWAYS_URL = 'alwaysUrl'
const ALWAYS_POST = 'alwaysPost'
const FIRST_SEPARATOR = 'firstSeparator'
const CUSTOM_SELECTOR = 'customSelector'

/// Request method types
// @see _Trocha.js /// Offers all the request types
const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const PATCH = 'PATCH'
const DELETE = 'DELETE'
const OPTIONS = 'OPTIONS'
const HEAD = 'HEAD'
const TRACE = 'TRACE'
const CONNECT = 'CONNECT'

/// Route types
// @see _Trocha.js
const ROUTE = 'ROUTE'
const SCOPE = 'SCOPE'
const _RESOURCE = 'RESOURCE'
const _ALIAS = 'ALIAS'

/// custom separator
// @see _Trocha.js
const SLASH = 'SLASH'
const BACK_SLASH = 'BACK_SLASH'
const DOT = 'DOT'

// Next const are private helpers for ID modes
const _PREID = '_PREID'
const _AVAILABLE_SEPARATORS = {}
_AVAILABLE_SEPARATORS[SLASH] = {}
_AVAILABLE_SEPARATORS[SLASH][SEPARATOR] = '/'
_AVAILABLE_SEPARATORS[SLASH][FIRST_SEPARATOR] = true
_AVAILABLE_SEPARATORS[BACK_SLASH] = {}
_AVAILABLE_SEPARATORS[BACK_SLASH][SEPARATOR] = '\\'
_AVAILABLE_SEPARATORS[BACK_SLASH][FIRST_SEPARATOR] = false
_AVAILABLE_SEPARATORS[DOT] = {}
_AVAILABLE_SEPARATORS[DOT][SEPARATOR] = '.'
_AVAILABLE_SEPARATORS[DOT][FIRST_SEPARATOR] = false
_AVAILABLE_SEPARATORS[undefined] = {}

/// ID modes
// @see _Trocha.js
const COLON = 'COLON'
const BRACKETS = 'BRACKETS'

// Next const are private helpers for ID modes
const _ID_MODE_REPLACE = 'Ñ' // Can be any rare character
const _AVAILABLE_ID_MODES = {} // In teory only used in _FORMAT_ID_FUN
_AVAILABLE_ID_MODES[BRACKETS] = `{${_ID_MODE_REPLACE}}`
_AVAILABLE_ID_MODES[COLON] = `:${_ID_MODE_REPLACE}`

/**
 * Interpolator of id mode to be used in path function
 * @todo should be Route protected(private & inheritable) method
 * @param {string} currentIdMode - can be BRACKETS | COLON
 * @second_order
 * @pure
 * @private
 * @return {function} see function below
 */
const _FORMAT_ID_FUN = currentIdMode =>
	/**
	 * Interpolate template with _AVAILABLE_ID_MODES[currentIdMode] and idName
	 * @param {string} idName
	 * @param {template_literal | string} template - should contain _ID_MODE_REPLACE value; default _ID_MODE_REPLACE
	 * @lambda
	 * @pure false - depends on currentIdMode, _AVAILABLE_ID_MODES and _ID_MODE_REPLACE
	 * @example λ('zxc',`asd${_ID_MODE_REPLACE}qwe`) will return 'asd:zxcqwe' or 'asd{zxc}qwe'
	 * @return {string}
	 */
	(idName, template = _ID_MODE_REPLACE) =>
		template.replace(
			_ID_MODE_REPLACE,
			_AVAILABLE_ID_MODES[currentIdMode].replace(_ID_MODE_REPLACE, idName)
		)

/// Route return attributes
const AS = 'as'
const PATH = 'path'

/// Not used right now
// const NEW_SCOPE = '_newScope'
// const NEW_ROUTE = '_newRoute'
// const NEW_RESOURCE = '_newResource'
// const NEW_ALIAS = '_newAlias'

/// BASIC RESOURCE
const _show = 'show'
const _edit = 'edit'
const _new = 'new'
const _list = 'list'
const _basicResource = (SS = DS) => {
	// selectedSelector
	const r = {}
	r[SS + ID] = ID
	r[_show] = {}
	r[_edit] = {}
	r[_new] = {}
	r[_list] = {}
	r[_show][SS + HIDE] = true
	r[_new][SS + ID] = false
	r[_list][SS + ID] = false
	r[_list][SS + HIDE] = true
	return r
}

/// Warnings and erros
const ERROR_HEADER = 'TrochaJS error: '
const WARNING_HEADER = 'TrochaJS warning: '
const ERROR_ROUTE_ALREADY_DEFINE = 'Route already declare'
const ERROR_SCOPE_AS_A_ROUTE = 'Scope is not printable a route'
const WARNING_RESOURCE_AS_A_ROUTE = 'Resource should not be used as a route'
const WARNING_ROUTE_ATTRIBUTE_NOT_SUPPORTED = 'Attribute not supported, skiped'
/* End: src/v2/_variables.js */
// Trocha class
/* Begin: src/v2/_Trocha.js */
// Route classes
/* Begin: src/v2/_Route.js */
/**
 * The Class where all other route types inherit
 * @module Route
 * @exports Route
 * @class
 */
class Route {
	/**
	 * Holds all the route information, note it's not protected(can't be inhered)
	 * @private
	 */
	#data = {
		parent: null,
		childs: {},
		SS: DS, // selectedSelector
		// next attributes just for root
		alwaysPost: false,
		alwaysUrl: false,
		idMode: COLON,
		domain: '',
		post: '',
		pre: '',
		separator: _AVAILABLE_SEPARATORS[SLASH][SEPARATOR],
		firstSeparator: _AVAILABLE_SEPARATORS[SLASH][FIRST_SEPARATOR]
	}

	/**
	 * @param {Route} mySelf - tldr this
	 * @param {string} id - id to compare to parents ids
	 * @pure
	 * @private
	 * @recursive
	 * @return {boolean} - does the parent or (parent parent and go on) have the id?
	 */
	#anyParentHasThisId = (mySelf, id) => {
		let SS = mySelf.#data.SS
		if (!mySelf.#data.parent) return false
		return (
			mySelf.#data.parent[SS + ID] === id ||
			mySelf.#anyParentHasThisId(mySelf.#data.parent, id)
		)
	}

	/**
	 * Adds a (custom)getter of attribute to mySelf
	 * @param {Route} mySelf - tldr this
	 * @param {string} attribute - name of the attribute to expose
	 * @param {function} fun - to use as a custom getter for attribute
	 * @param {boolean} skipSelector - if false will add selectedSelector to getter name
	 * @sideEffect mySelf
	 * @private
	 */
	#newGetter = (mySelf, attribute, fun, skipSelector) => {
		let SS = skipSelector ? '' : mySelf.#data.SS
		Object.defineProperty(mySelf, SS + attribute, {
			get() {
				if (fun) return fun()
				else return mySelf.#data[attribute]
			},
			enumerable: true,
			configurable: false
		})
	}

	/**
	 * Constructor helper, set attributes and getters of current route
	 * @param {Route} mySelf - tldr this
	 * @param {string} attribute - name
	 * @sideEffect mySelf - add getters, modify #data; posibleRouteDef - delete all attributes
	 * @private
	 */
	#defineMyAttributes = (mySelf, posibleRouteDef) => {
		let SS = mySelf.#data.SS

		/**
		 * @param {string} attribute - name of the attribute to add to #data then remove of mySelf
		 * @pure false - depends on mySelf
		 * @sideEffect mySelf
		 */
		let _setAndDisposeAttribute = attribute => {
			mySelf.#data[attribute] = posibleRouteDef[SS + attribute]
			delete posibleRouteDef[SS + attribute]
		}

		_setAndDisposeAttribute(NAME)
		_setAndDisposeAttribute(ID)
		_setAndDisposeAttribute(DEFAULT_ID)
		_setAndDisposeAttribute(TYPE)
		_setAndDisposeAttribute(METHOD)

		_setAndDisposeAttribute(ALIAS)
		_setAndDisposeAttribute(RESOURCE)

		_setAndDisposeAttribute(HIDE)
		_setAndDisposeAttribute(POSTFIX)
		_setAndDisposeAttribute(JUST_ID)
		_setAndDisposeAttribute(PARENT_ID)
		if (false === posibleRouteDef[mySelf.#data.parent[SS + ID]])
			_setAndDisposeAttribute(mySelf.#data.parent[SS + ID])
		mySelf.#newGetter(mySelf, NAME)
		mySelf.#newGetter(mySelf, ID) // @TODO DOCUMENT ME
		mySelf.#newGetter(mySelf, METHOD)
		mySelf.#newGetter(mySelf, AS, () => mySelf.#as(mySelf))
	}

	/**
	 * Constructor helper, create one child route
	 * @param {Route} mySelf - tldr this
	 * @param {object} routeDefinition - child route attributes
	 * @param {string} name - route name
	 * @sideEffect mySelf - add getters, modify #data; routeDefinition add $name
	 * @private
	 * @throws ERROR_ROUTE_ALREADY_DEFINE
	 */
	#createChildRoute = (mySelf, routeDefinition, name) => {
		let SS = mySelf.#data.SS
		if (mySelf.#data.childs[name])
			_throwError(mySelf, ERROR_ROUTE_ALREADY_DEFINE, name)
		let routeSubclasses = [Route, Alias, Resource, Scope]
		routeSubclasses.forEach(routeSubclass => {
			if (routeSubclass.is(routeDefinition, SS))
				routeDefinition = routeSubclass.diggest(routeDefinition, SS, SS)
		})
		routeDefinition[SS + NAME] = name
		let routeTypes = {}
		routeTypes[ROUTE] = Route
		routeTypes[undefined] = Route
		routeTypes[_ALIAS] = Alias
		routeTypes[SCOPE] = Scope
		routeTypes[_RESOURCE] = Resource

		let newRoute = new routeTypes[routeDefinition[SS + TYPE]](
			mySelf,
			routeDefinition,
			SS,
			mySelf.#data.root
		)
		mySelf.#data.childs[name] = newRoute
		mySelf.#newGetter(mySelf, name, () => mySelf.#data.childs[name], true)
	}

	/**
	 * Constructor helper, create child routes
	 * @param {Route} mySelf - tldr this
	 * @param {object} argChildRoutes - child routeDefinitions
	 * @param {boolean} skipResource - prevent infinity loop on resource creation
	 * @sideEffect mySelf - add getters, modify #data
	 * @private
	 * @recursive
	 */
	#diggestChildRoutes = (mySelf, argChildRoutes, skipResource) => {
		let SS = mySelf.#data.SS
		if (!skipResource && mySelf.#data[TYPE] === _RESOURCE) {
			let resourceChilds = mySelf.#data[RESOURCE]
			delete resourceChilds[SS + ID]
			mySelf.#diggestChildRoutes(mySelf, resourceChilds, true)
		}

		let posibleChildRoutesNames = Object.keys(argChildRoutes)
		while (posibleChildRoutesNames.length) {
			let posibleChild = posibleChildRoutesNames.pop()
			if (
				// This case disable any <id>=false
				argChildRoutes[posibleChild] === false &&
				mySelf.#anyParentHasThisId(mySelf, posibleChild)
			)
				mySelf.#data[posibleChild] = false
			else {
				mySelf.#createChildRoute(
					mySelf,
					argChildRoutes[posibleChild],
					posibleChild
				)
				if (mySelf.#data[TYPE] === SCOPE) {
					let scopedChild = { ...argChildRoutes[posibleChild] }
					scopedChild[SS + PARENT_ID] = false
					mySelf.#createChildRoute(
						mySelf.#data.parent,
						scopedChild,
						posibleChild
					)
				}
			}
		}
	}

	/**
	 * getter function of $as
	 * @param {Route} mySelf - tldr this
	 * @recursive via parent.$as
	 * @return {string} flat self and parents name separated by _
	 */
	#as = mySelf => {
		let SS = mySelf.#data.SS
		return mySelf.#data.parent[SS + AS]
			? `${mySelf.#data.parent[SS + AS]}_${mySelf.#data[NAME]}`
			: mySelf.#data[NAME]
	}

	/**
	 * This constructor should be used just for test'n debug purposes
	 * pure false depends on #data initial attributes
	 * @param {Route} myParent
	 * @param {routeParamsDefinition} argRouteDef
	 * @param {string} argCustomSelector
	 * @param {Route} argRoot
	 * @param {object} [argChildRoutes={}]
	 * @param {string} [argDomain]
	 * @param {boolean} [argAlwaysUrl]
	 * @param {string} [argPre]
	 * @param {string} [argPost]
	 * @param {boolean} [argAlwaysPost]
	 * @param {Trocha.COLON | Trocha.BRACKETS} [argIdMod=Trocha.COLON]
	 * @param {Trocha.SLASH | Trocha.BACK_SLASH | Trocha.DOT} [argSeparator=Trocha.SLASH]
	 * @param {boolean} [argfirstSeparator=true]
	 */
	constructor(
		myParent,
		argRouteDef,
		argCustomSelector,
		argRoot,
		// Arguments for root Route
		argChildRoutes = {},
		argDomain,
		argAlwaysUrl,
		argPre,
		argPost,
		argAlwaysPost,
		//argAlwaysPre,// @TODO
		argIdMode,
		argSeparator,
		argfirstSeparator
	) {
		let SS = (this.#data.SS = argCustomSelector || DS) // selectedSelector
		if (
			myParent ||
			(argRouteDef && argRouteDef[SS + NAME] && argRouteDef[SS + TYPE])
		) {
			// It's a normal route
			this.#data.parent = myParent
			this.#data.root = argRoot
			this.#defineMyAttributes(this, argRouteDef)
			this.#diggestChildRoutes(this, argRouteDef)
		} else {
			// It's the root route
			const _setRootAttribute = (attribute, value) =>
				(this.#data[attribute] = value !== undefined ? value : this.#data[attribute])
			_setRootAttribute(DOMAIN, argDomain)
			this.#newGetter(this, DOMAIN)
			_setRootAttribute(ALWAYS_URL, argAlwaysUrl)
			_setRootAttribute(ALWAYS_POST, argAlwaysPost)
			_setRootAttribute(POSTFIX, argPost)
			_setRootAttribute(PREFIX, argPre)
			_setRootAttribute(ID_MODE, argIdMode)

			_setRootAttribute(SEPARATOR, _AVAILABLE_SEPARATORS[argSeparator][SEPARATOR])
			_setRootAttribute(
				FIRST_SEPARATOR,
				argfirstSeparator !==  undefined ? argfirstSeparator : _AVAILABLE_SEPARATORS[argSeparator][FIRST_SEPARATOR]
			)
			_setRootAttribute(_PREID, this.#data[SEPARATOR] + _ID_MODE_REPLACE)

			this.#data.root = this.#data
			delete this[PATH]
			this.#newGetter(this, _RESOURCE, () => _basicResource(SS))
			this.#diggestChildRoutes(this, argChildRoutes)
		}
	}

	_newRoute = args => {
		args[TYPE] = ROUTE
		if (!Route.is(args, '')) return false
		this.#createChildRoute(
			this,
			Route.diggest(args, this.#data.SS, ''),
			args[NAME]
		)
	}
	_newScope = args => {
		args[TYPE] = SCOPE
		if (!Scope.is(args, '')) return false
		this.#createChildRoute(
			this,
			Scope.diggest(args, this.#data.SS, ''),
			args[NAME]
		)
	}
	_newAlias = args => {
		args[TYPE] = _ALIAS
		if (!Alias.is(args, '')) return false
		this.#createChildRoute(
			this,
			Alias.diggest(args, this.#data.SS, ''),
			args[NAME]
		)
	}
	_newResource = args => {
		args[TYPE] = _RESOURCE
		if (!Resource.is(args, '')) return false
		this.#createChildRoute(
			this,
			Resource.diggest(args, this.#data.SS, ''),
			args[NAME]
		)
	}

	// prettier-ignore // < Does not work ¬¬
/* Begin: src/v2/_Route_path.js */
	path(routeParams = {}, customNameFun) {
		const
			myData = this.#data,
			parent = myData.parent || {},
			rootData = myData.root,
			SS = myData.SS,
			isFirtsParent = !!parent[SS+DOMAIN],
			_formatID = _FORMAT_ID_FUN(rootData[ID_MODE])
		let r = s

		if (myData[NAME] === undefined) return ''

		// 1 print the domain
		r =
			rootData[DOMAIN] &&
			isFirtsParent &&
			routeParams[URL] !== false &&
			(routeParams[URL] || rootData[ALWAYS_URL])
				? rootData[DOMAIN]
				: s

		// 2 add the prefix
		r +=
			rootData[PREFIX] && (routeParams[PREFIX] || routeParams[EXTENDED])
				? rootData[PREFIX]
				: s
		delete routeParams[PREFIX]

		// 3 print parent paths
		let parentPathArg = {}
		parentPathArg[URL] = routeParams[URL]
		let parentPathResponse = parent[PATH](parentPathArg, () => true)
		let thisIsChildPath = !! parentPathResponse
		// 3.1 enable firstSeparator
		let _ = (thisIsChildPath || rootData[FIRST_SEPARATOR]) ? rootData[SEPARATOR] : s
		parentPathArg[POSTFIX] = false
		r += parentPathResponse
		delete routeParams[URL]

		// 4.A print name & id(name) from customNameFun like Alias
		let hide =
			routeParams[HIDE] !== undefined
				? routeParams[HIDE]
				: myData[HIDE] || (myData[JUST_ID] && myData[DEFAULT_ID] === false)
		let customNameFromInhered
		if ('function' === typeof customNameFun)
			customNameFromInhered = customNameFun(myData, _)
		if ('string' === typeof customNameFromInhered) r += customNameFromInhered
		else {
			// 4.B print default name & id(name)
			let myId = _formatID(myData[ID])
			if (
				// 4.B.1 justId case
				routeParams[JUST_ID] !== false &&
				(myData[JUST_ID] && myData[ID] && myData[myData[ID]] !== false)
			) {
				r += _ + myId
			} else {
				// 4.B.2 hide case
				let noIdentifier = myData[ID] ? routeParams[ID] === false : true
				r += hide ? s : _ + myData[NAME]
				r += noIdentifier ? s : rootData[SEPARATOR] + myId
			}
		}

		// 5 add the postfix
		/**
		 * @TODO Document hide also remove postfix
		 */
		r +=
			rootData[POSTFIX] &&
			!hide &&
			routeParams[POSTFIX] !== false &&
			(rootData[ALWAYS_POST] ||
				myData[POSTFIX] ||
				routeParams[POSTFIX] ||
				routeParams[EXTENDED])
				? rootData[POSTFIX]
				: s
		delete routeParams[POSTFIX]

		// Note next 2 step first clear the routeParams then later on print the colected data
		// 7-1 get query part(also know as search... the ?asd=1 part)
		let query = {}
		if (routeParams[QUERY]) {
			query = JSON.parse(JSON.stringify(routeParams[QUERY]))
			delete routeParams[QUERY]
		}

		// 8-1 get fragment part(also know as anchor... the #asd part)
		let fragment = s
		if (routeParams[FRAGMENT]) {
			fragment = routeParams[FRAGMENT]
			delete routeParams[FRAGMENT]
		}

		// 6 Replace Or Remove(RoR) Ids

		// 6.1 RoR parentId
		if (
			parent[SS + ID] &&
			!routeParams[parent[SS + ID]] &&
			(myData[ID] === false ||
				routeParams[PARENT_ID] === false ||
				myData[PARENT_ID] === false)
		)
			r = r.replace(_formatID(parent[SS + ID], rootData[_PREID]), s)

		// 6.2 Remove parents Ids designed in constructor
		Object.keys(myData).forEach(idName => {
			if (myData[idName] === false && !routeParams[idName])
				return (r = r.replace(_formatID(idName, rootData[_PREID]), s))
		})

		// 6.2 RoR selected Ids in path params
		Object.keys(routeParams).forEach(idName => {
			if (routeParams[idName] === false)
				// Remove
				r = r.replace(_formatID(idName, rootData[_PREID]), s)
			// Replace
			else r = r.replace(_formatID(idName), routeParams[idName])
		})

		// 7 Now add the query
		Object.keys(query).forEach(function(key, i, array) {
			if (i === 0) r += '?'
			if (Array.isArray(query[key]))
				query[key].forEach(
					(value, _i) =>
						(r +=
							encodeURIComponent(key) +
							'[]=' +
							encodeURIComponent(value) +
							(query[key].length - 1 !== _i || array.length - 1 !== i ? '&' : ''))
				)
			else
				r +=
					encodeURIComponent(key) +
					'=' +
					encodeURIComponent(query[key]) +
					(array.length - 1 !== i ? '&' : '')
		})

		// 8 Now add the fragment
		if (fragment) r += '#' + encodeURIComponent(fragment)

		return r
	}
/* End: src/v2/_Route_path.js */

	toString = () => this.#as(this)

	static DEFAULT_METHOD = GET

	/**
	 * Check if given routeDefinition is Route
	 * @param {object} routeDefinition -
	 * @param {string} SS - selectedSelector normally $
	 * @static
	 * @pure
	 * @return {boolean} routeDefinition is route?
	 */
	static is(routeDefinition, SS) {
		return (
			routeDefinition[SS + TYPE] === ROUTE ||
			('object' === typeof routeDefinition &&
				routeDefinition[SS + TYPE] === undefined)
		)
	}

	/**
	 * This function serve 2 purposes:
	 * (With just first 3 params) Sanitize routeDefinition for ROUTE valid params (this behabior is override)
	 * (With full params) add <routeDefinition>.<IS><attributes> to <dest>.<SS><attributes> (this behabior is not inhered)
	 * @tobe_overload
	 * @param {object} routeDefinition -
	 * @param {string} SS - selector to be return
	 * @param {string} IS - selector to be find
	 * @param {object} dest - another routeDefinition
	 * @param {array<string>} attributes - to be added from routeDefinition to dest
	 * @sideEffect dest
	 */
	static diggest = (routeDefinition, SS, IS, dest, attributes) => {
		if (dest && attributes)
			// is used from subroutes
			attributes.forEach(attribute => {
				dest[SS + attribute] = routeDefinition[IS + attribute]
			})
		else {
			let r = {}
			r[SS + TYPE] = ROUTE
			r[SS + METHOD] = routeDefinition[IS + METHOD] || Route.DEFAULT_METHOD
			Route.diggest(routeDefinition, SS, IS, r, [
				ID,
				HIDE,
				JUST_ID,
				POSTFIX,
				PARENT_ID
			])
			Route._trimSelector(IS, routeDefinition, r)
			return r
		}
	}

	/**
	 * Add the routes defined (those without the current selector) to the
	 * diggested routeDefinition(dest), note this only works with a selectorl else maybe
	 * it's from function creation route like _newScope
	 * @static
	 * @pure false
	 * @side_effect dest
	 * @param {string} SS selectedSelector
	 * @param {object} src routeDefinition in
	 * @param {object} dest routeDefinition out
	 */
	static _trimSelector = (IS, src, dest) => {
		if (IS === '') return
		Object.keys(src).forEach(attribute => {
			if (attribute.slice(0, 2) !== IS) dest[attribute] = src[attribute]
			else _throwWarning(this, WARNING_ROUTE_ATTRIBUTE_NOT_SUPPORTED, attribute)
		})
	}
}
/* End: src/v2/_Route.js */
/* Begin: src/v2/_Alias.js */
class Alias extends Route {
	constructor(...args) {
		super(...args)
	}

	/**
	 * Sanitize routeDefinition for ALIAS valid params
	 * @static
	 * @overload Route.diggest
	 * @param {object} routeDefinition
	 * @param {string} SS - selector to be return
	 * @param {string} IS - selector to be find
	 * @return {object} sanitized copy of routeDefinition
	 */
	static diggest(routeDefinition, SS, IS) {
		let r = {}
		r[SS + TYPE] = _ALIAS
		r[SS + ALIAS] = routeDefinition[IS + ALIAS] || routeDefinition
		r[SS + METHOD] = routeDefinition[IS + METHOD] || Route.DEFAULT_METHOD
		Route.diggest(routeDefinition, SS, IS, r, [ID, POSTFIX, PARENT_ID])
		if ('string' !== typeof routeDefinition)
			Route._trimSelector(IS, routeDefinition, r)
		return r
	}

	/**
	 * Check if given routeDefinition is ALIAS
	 * @see Route.is
	 * @pure
	 * @static
	 * @override
	 * @return {boolean} routeDefinition is alias?
	 */
	static is(routeDefinition, SS) {
		return (
			'string' === typeof routeDefinition ||
			(routeDefinition[SS + TYPE] === _ALIAS && routeDefinition[SS + ALIAS])
		)
	}

	/**
	 * Print ALIAS type routes
	 * diferences with Route.path: use alias instead of name and if it's base will not start with /
	 * @see Route.path
	 * @overload Route.path
	 */
	path(routeParams = {}) {
		return super.path(routeParams, function(myData, _) {
			// Note Alias dnt support hide nor justId in creation
			const parent = myData.parent || {}
			const rootData = myData.root
			const _formatID = _FORMAT_ID_FUN(rootData[ID_MODE])
			const myId = _formatID(myData[ID], rootData[_PREID])
			let r = s

			if (myData[ID] && routeParams[JUST_ID]) {
				r += myId
			} else {
				let useID = !!myData[ID] && routeParams[myData[ID]] !== false
				r += parent.constructor.name === 'Trocha' ? s : _
				r += routeParams[HIDE] ? s : myData[ALIAS]
				r += useID ? myId : s
			}
			return r
		})
	}
}
/* End: src/v2/_Alias.js */
/* Begin: src/v2/_Resource.js */
class Resource extends Route {
	constructor(...args) {
		super(...args)
	}

	/**
	 * @override
	 */
	static diggest(routeDefinition, SS, IS) {
		let r = {}
		r[SS + TYPE] = _RESOURCE
		r[SS + RESOURCE] = routeDefinition[IS + RESOURCE] || _basicResource(SS)
		Route.diggest(routeDefinition, SS, IS, r, [ID])
		Route._trimSelector(IS, routeDefinition, r)
		return r
	}

	/**
	 * @override
	 */
	static is(routeDefinition, SS) {
		return (
			routeDefinition[SS + TYPE] === _RESOURCE && routeDefinition[SS + ID] // &&
			// routeDefinition[SS+RESOURCE]
		)
	}

	/**
	 * @override
	 */
	path(routeParams = {}, force) {
		return super.path(routeParams, function(myData, _) {
			if ('function' === typeof force && force() !== true)
				_throwWarning(undefined, WARNING_RESOURCE_AS_A_ROUTE)
			return false
		})
	}
}
/* End: src/v2/_Resource.js */
/* Begin: src/v2/_Scope.js */
class Scope extends Route {
	constructor(...args) {
		super(...args)
	}

	/**
	 * @override
	 */
	static diggest(routeDefinition, SS, IS) {
		let r = {}
		r[SS + TYPE] = SCOPE
		r[SS + JUST_ID] = true
		r[SS + DEFAULT_ID] = routeDefinition[IS + DEFAULT_ID] || false
		Route.diggest(routeDefinition, SS, IS, r, [ID, HIDE])
		Route._trimSelector(IS, routeDefinition, r)
		return r
	}

	/**
	 * @override
	 */
	static is(routeDefinition, SS) {
		return (
			'object' === typeof routeDefinition &&
			routeDefinition[SS + TYPE] === SCOPE &&
			routeDefinition[SS + ID] // Should scope always have id????
		)
	}

	/**
	 * @override
	 */
	path(routeParams = {}, force) {
		return super.path(routeParams, function(myData, _) {
			if ('function' === typeof force && force() !== true)
				_throwError(undefined, ERROR_SCOPE_AS_A_ROUTE)
			return false
		})
	}
}
/* End: src/v2/_Scope.js */

/**
 * The main Class of the trocha library
 * @see https://dfoxpro.github.io/trochaJS/#101-intro-to-trocha-js
 * @module Trocha
 * @exports default, Trocha
 * @class
 */
class Trocha extends Route {
	/**
	 * @constr0uctor
	 * @see https://dfoxpro.github.io/trochaJS/#203-route-definition-parameters
	 * @param {object} [arg]
	 * @param {routeParamsDefinition} [arg.routes]
	 * @param {routeParamsDefinition} arg.routes.<children_route>
	 * @param {Trocha.ROUTE | Trocha.SCOPE | Trocha.RESOURCE | Trocha.ALIAS} [arg.routes.$type=Trocha.ROUTE]
	 * @param {Trocha.COLON | Trocha.BRACKETS} [arg.idMode=Trocha.COLON]
	 * @param {Trocha.SLASH | Trocha.BACK_SLASH | Trocha.DOT} [arg.separator=Trocha.SLASH]
	 * @param {String} arg.routes.$alias
	 * @param {String} arg.routes.$id
	 * @param {string} [arg.customSelector=$]
	 * @param {string} [arg.domain]
	 * @param {string} [arg.pre]
	 * @param {string} [arg.post]
	 * @param {boolean} [firstSeparator=true]
	 * @param {boolean} [arg.alwaysUrl=false]
	 * @param {boolean} [arg.alwaysPost=false]
	 */
	constructor(args = {}) {
		super(
			null,
			null, //Because it's the root
			args[CUSTOM_SELECTOR],
			null,
			args[ROUTES],
			args[DOMAIN],
			args[ALWAYS_URL],
			args[PREFIX],
			args[POSTFIX],
			args[ALWAYS_POST],
			//args[ALWAYSPRE],/**@TODO
			args[ID_MODE],
			args[SEPARATOR],
			args[FIRST_SEPARATOR]
		)
	}

	//// STATIC AVAILABLE ATTRIBUTES
	/// Offers all the route types
	/**
	 * Default route type
	 * Symbol for Route type... route
	 * @see https://dfoxpro.github.io/trochaJS/#route
	 * @public
	 * @static
	 */
	static get ROUTE() {
		return ROUTE
	}
	/**
	 * Route type optional to tree definition
	 * Symbol for Scope type route
	 * @see https://dfoxpro.github.io/trochaJS/#scope
	 * @public
	 * @static
	 */
	static get SCOPE() {
		return SCOPE
	}
	/**
	 * Route type that contain a CRUD like tree route definition
	 * Symbol for Resource type route
	 * @see https://dfoxpro.github.io/trochaJS/#resource
	 * @public
	 * @static
	 */
	static get RESOURCE() {
		return _RESOURCE
	}
	/**
	 * Route type that can be used to abbreviate long name routes, like CDN
	 * Symbol for Alias type route
	 * @see https://dfoxpro.github.io/trochaJS/#alias
	 * @public
	 * @static
	 */
	static get ALIAS() {
		return _ALIAS
	}

	/// Offers all the request types
	/**
	 * HTTP request method
	 * Used by browsers to ask CORS permissions
	 * @public
	 * @static
	 */
	static get OPTIONS() {
		return OPTIONS
	}
	/**
	 * Most common HTTP request method
	 * It's tue default method for all routes
	 * Used in REST for Read operations
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods for all methods info
	 * @public
	 * @static
	 */
	static get GET() {
		return GET
	}
	/**
	 * HTTP request method
	 * Same as get without body response
	 * @public
	 * @static
	 */
	static get HEAD() {
		return HEAD
	}
	/**
	 * HTTP request method
	 * Used in REST for Create operations
	 * @public
	 * @static
	 */
	static get POST() {
		return POST
	}
	/**
	 * HTTP request method
	 * Used in REST for Create operations
	 * @public
	 * @static
	 */
	static get PUT() {
		return PUT
	}
	/**
	 * HTTP request method
	 * Used in REST for Update/Write operations
	 * @public
	 * @static
	 */
	static get PATCH() {
		return PATCH
	}
	/**
	 * HTTP request method
	 * Used in REST for Destroy/Remove operations
	 * @public
	 * @static
	 */
	static get DELETE() {
		return DELETE
	}
	/**
	 * HTTP request method
	 * Used for usage/error log client to server
	 * @public
	 * @static
	 */
	static get TRACE() {
		return TRACE
	}
	/**
	 * HTTP request method
	 * @public
	 * @static
	 */
	static get CONNECT() {
		return CONNECT
	}

	/// Offers ID modes
	/**
	 * Standard definition of Id; used in Angular, React(Router)
	 * Symbol for "/:the_id" id mode, default ID mode
	 * @public
	 * @static
	 */
	static get COLON() {
		return COLON
	}
	/**
	 * Definition of Id used in CanJS and other frameworks
	 * Symbol for "/{the_id}" id mode
	 * @public
	 * @static
	 */
	static get BRACKETS() {
		return BRACKETS
	}

	/*
	 * Offers basic resource structure
	 * @See Route constructor for custom selector
	 */
	static get $RESOURCE() {
		return _basicResource()
	}

	/**
	 * Standard definition of separator; used in Unix, http
	 * Symbol for "/" separator, default separator
	 * @public
	 * @static
	 */
	static get SLASH() {
		return SLASH
	}
	/**
	 * Used in MS Windows file system
	 * Symbol for "\" separator
	 * @public
	 * @static
	 */
	static get BACK_SLASH() {
		return BACK_SLASH
	}
	/**
	 * Used in localization libraries and other properties enviorements
	 * Symbol for "." separator
	 * @public
	 * @static
	 */
	static get DOT() {
		return DOT
	}
}
/* End: src/v2/_Trocha.js */
/* End: src/v2/_core.js */
export {
	Trocha,
	Route,
	Alias,
	Resource,
	Scope,
	// Request method types
	OPTIONS,
	GET,
	HEAD,
	POST,
	PUT,
	PATCH,
	DELETE,
	TRACE,
	CONNECT,
	// Route types
	ROUTE,
	SCOPE,
	_RESOURCE as RESOURCE,
	_ALIAS as ALIAS,
	// Resource fun
	_basicResource as $RESOURCE
}
