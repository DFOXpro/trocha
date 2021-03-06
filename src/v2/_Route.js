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
	include "_Route_path.js"

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
