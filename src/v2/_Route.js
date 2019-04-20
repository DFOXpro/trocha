/**
 * The Class where all other route types inherit
 * @module Route
 * @exports Route
 * @class
 */
(() =>
function Route () {
	/**
	 * Holds all the route information, note it's not protected(can't be inhered)
	 * @private
	 */
	let _data = {
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
	const _anyParentHasThisId = (mySelf, id) => {
		let SS = _data.SS
		if (!_data.parent) return false
		return (
			_data.parent[SS + ID] === id ||
			_anyParentHasThisId(_data.parent, id)
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
	const _newGetter = (mySelf, attribute, fun, skipSelector) => {
		let SS = skipSelector ? '' : _data.SS
		Object.defineProperty(mySelf, SS + attribute, {
			get() {
				if (fun) return fun()
				else return _data[attribute]
			},
			enumerable: true,
			configurable: false
		})
	}

	/**
	 * @param {string} attribute - name of the attribute to add to _data then remove of mySelf
	 * @pure false - depends on mySelf
	 * @sideEffect mySelf
	 */
	const _setAndDisposeAttribute = attribute => {
		let SS = _data.SS
		_data[attribute] = posibleRouteDef[SS + attribute]
		delete posibleRouteDef[SS + attribute]
	}

	/**
	 * Constructor helper, set attributes and getters of current route
	 * @param {Route} mySelf - tldr this
	 * @param {string} attribute - name
	 * @sideEffect mySelf - add getters, modify _data; posibleRouteDef - delete all attributes
	 * @private
	 */
	const _defineMyAttributes = (mySelf, posibleRouteDef) => {
		let SS = _data.SS

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
		if (false === posibleRouteDef[_data.parent[SS + ID]])
			_setAndDisposeAttribute(_data.parent[SS + ID])
		_newGetter(mySelf, NAME)
		_newGetter(mySelf, ID) // @TODO DOCUMENT ME
		_newGetter(mySelf, METHOD)
		_newGetter(mySelf, AS, () => _as(mySelf))
	}

	/**
	 * Constructor helper, create one child route
	 * @param {Route} mySelf - tldr this
	 * @param {object} routeDefinition - child route attributes
	 * @param {string} name - route name
	 * @sideEffect mySelf - add getters, modify _data; routeDefinition add $name
	 * @private
	 * @throws ERROR_ROUTE_ALREADY_DEFINE
	 */
	const _createChildRoute = (mySelf, routeDefinition, name) => {
		let SS = _data.SS
		if (_data.childs[name])
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
			_data.root
		)
		_data.childs[name] = newRoute
		_newGetter(mySelf, name, () => _data.childs[name], true)
	}

	/**
	 * Constructor helper, create child routes
	 * @param {Route} mySelf - tldr this
	 * @param {object} argChildRoutes - child routeDefinitions
	 * @param {boolean} skipResource - prevent infinity loop on resource creation
	 * @sideEffect mySelf - add getters, modify _data
	 * @private
	 * @recursive
	 */
	const _diggestChildRoutes = (mySelf, argChildRoutes, skipResource) => {
		let SS = _data.SS
		if (!skipResource && _data[TYPE] === _RESOURCE) {
			let resourceChilds = _data[RESOURCE]
			delete resourceChilds[SS + ID]
			_diggestChildRoutes(mySelf, resourceChilds, true)
		}

		let posibleChildRoutesNames = Object.keys(argChildRoutes)
		while (posibleChildRoutesNames.length) {
			let posibleChild = posibleChildRoutesNames.pop()
			if (
				// This case disable any <id>=false
				argChildRoutes[posibleChild] === false &&
				_anyParentHasThisId(mySelf, posibleChild)
			)
				_data[posibleChild] = false
			else {
				_createChildRoute(
					mySelf,
					argChildRoutes[posibleChild],
					posibleChild
				)
				if (_data[TYPE] === SCOPE) {
					let scopedChild = { ...argChildRoutes[posibleChild] }
					scopedChild[SS + PARENT_ID] = false
					_createChildRoute(
						_data.parent,
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
	const _as = mySelf => {
		let SS = _data.SS
		return _data.parent[SS + AS]
			? `${_data.parent[SS + AS]}_${_data[NAME]}`
			: _data[NAME]
	}

	/**
	 * This constructor should be used just for test'n debug purposes
	 * pure false depends on _data initial attributes
	 * @constructor
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
	 * @param {function | object<function>} [argCustomFunction]
	 */
	const _Route_constructor = function (
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
		argfirstSeparator,
		argCustomFunction
	) {
		let SS = (_data.SS = argCustomSelector || DS) // selectedSelector
		if (
			myParent ||
			(argRouteDef && argRouteDef[SS + NAME] && argRouteDef[SS + TYPE])
		) {
			// It's a normal route
			_data.parent = myParent
			_data.root = argRoot
			_defineMyAttributes(this, argRouteDef)
			_diggestChildRoutes(this, argRouteDef)
		} else {
			// It's the root route
			const _setRootAttribute = (attribute, value) =>
				(_data[attribute] =
					value !== undefined ? value : _data[attribute])
			_setRootAttribute(DOMAIN, argDomain)
			_newGetter(this, DOMAIN)
			_setRootAttribute(ALWAYS_URL, argAlwaysUrl)
			_setRootAttribute(ALWAYS_POST, argAlwaysPost)
			_setRootAttribute(POSTFIX, argPost)
			_setRootAttribute(PREFIX, argPre)
			_setRootAttribute(ID_MODE, argIdMode)

			_setRootAttribute(
				SEPARATOR,
				_AVAILABLE_SEPARATORS[argSeparator][SEPARATOR]
			)
			_setRootAttribute(
				FIRST_SEPARATOR,
				argfirstSeparator !== undefined
					? argfirstSeparator
					: _AVAILABLE_SEPARATORS[argSeparator][FIRST_SEPARATOR]
			)
			_setRootAttribute(_PREID, _data[SEPARATOR] + _ID_MODE_REPLACE)
			_setRootAttribute(CUSTOM_FUNCTION, argCustomFunction)

			_data.root = _data
			delete this[PATH]
			_newGetter(this, _RESOURCE, () => _basicResource(SS))
			_diggestChildRoutes(this, argChildRoutes)
		}
	}

	_newRoute = args => {
		args[TYPE] = ROUTE
		if (!Route.is(args, '')) return false
		_createChildRoute(
			this,
			Route.diggest(args, _data.SS, ''),
			args[NAME]
		)
	}
	_newScope = args => {
		args[TYPE] = SCOPE
		if (!Scope.is(args, '')) return false
		_createChildRoute(
			this,
			Scope.diggest(args, _data.SS, ''),
			args[NAME]
		)
	}
	_newAlias = args => {
		args[TYPE] = _ALIAS
		if (!Alias.is(args, '')) return false
		_createChildRoute(
			this,
			Alias.diggest(args, _data.SS, ''),
			args[NAME]
		)
	}
	_newResource = args => {
		args[TYPE] = _RESOURCE
		if (!Resource.is(args, '')) return false
		_createChildRoute(
			this,
			Resource.diggest(args, _data.SS, ''),
			args[NAME]
		)
	}

	path = routeParams => _path(routeParams, _data)

	toString = () => _as(this)

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

Object.defineProperty(Route, DEFAULT_METHOD, {
  get: function() {
    return GET
  }
})

)()