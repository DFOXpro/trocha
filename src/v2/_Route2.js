let _Route
;(function() {
	/**
	 * The Class where all other route types inherit
	 * @class Route
	 */
	function Route(args = {}) {
		var _this = this

		/**
		 * Holds all the route information
		 * @private
		 */
		var _data = {}
		_data[PARENT] = null
		_data[CHILDS] = {}
		_data[SS] = DS
		// next attributes just for root
		_data[ALWAYS_POST] = false
		_data[ALWAYS_URL] = false
		_data[ID_MODE] = COLON
		_data[DOMAIN] = ''
		_data[POSTFIX] = ''
		_data[PREFIX] = ''
		_data[SEPARATOR] = _AVAILABLE_SEPARATORS[SLASH][SEPARATOR]
		_data[FIRST_SEPARATOR] = _AVAILABLE_SEPARATORS[SLASH][FIRST_SEPARATOR]

		return _constructor(args)
	}

	/**
	 * @param {Route} mySelf
	 * @param {string} id - id to compare to parents ids
	 * @param {string} SS - selectedSelector
	 * @param {object} _data
	 * @memberof Route
	 * @pure
	 * @private
	 * @recursive
	 * @return {boolean} - does the parent or (parent parent and go on) have the id?
	 */
	function _anyParentHasThisId(mySelf, id, SS, _data) {
		SS = SS || _data[SS]
		if (!_data[parent]) return false
		return (
			_data[parent][SS + ID] === id ||
			_anyParentHasThisId(_data[parent], id, SS)
		)
	}

	/**
	 * Adds a (custom)getter of attribute to mySelf
	 * @param {Route} mySelf - tldr this
	 * @param {string} attribute - name of the attribute to expose
	 * @param {function} fun - to use as a custom getter for attribute
	 * @param {boolean} skipSelector - if false will add selectedSelector to getter name
	 * @memberof Route
	 * @sideEffect mySelf
	 * @pure
	 * @private
	 */
	function _newGetter(_data, mySelf, attribute, fun, skipSelector) {
		var SS = skipSelector ? '' : _data[SS]
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
	 * @pure
	 * @sideEffect mySelf
	 */
	function _setAndDisposeAttribute(_data, posibleRouteDef, attribute) {
		var SS = _data[SS]
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
	function _defineMyAttributes(mySelf, posibleRouteDef) {
		var SS = _data[SS]

		_setAndDisposeAttribute(_data, posibleRouteDef, NAME)
		_setAndDisposeAttribute(_data, posibleRouteDef, ID)
		_setAndDisposeAttribute(_data, posibleRouteDef, DEFAULT_ID)
		_setAndDisposeAttribute(_data, posibleRouteDef, TYPE)
		_setAndDisposeAttribute(_data, posibleRouteDef, METHOD)

		_setAndDisposeAttribute(_data, posibleRouteDef, ALIAS)
		_setAndDisposeAttribute(_data, posibleRouteDef, RESOURCE)

		_setAndDisposeAttribute(_data, posibleRouteDef, HIDE)
		_setAndDisposeAttribute(_data, posibleRouteDef, POSTFIX)
		_setAndDisposeAttribute(_data, posibleRouteDef, JUST_ID)
		_setAndDisposeAttribute(_data, posibleRouteDef, PARENT_ID)
		if (false === posibleRouteDef[_data[PARENT][SS + ID]])
			_setAndDisposeAttribute(_data, posibleRouteDef, _data[PARENT][SS + ID])
		_newGetter(_data, mySelf, NAME)
		_newGetter(_data, mySelf, ID) // @TODO DOCUMENT ME
		_newGetter(_data, mySelf, METHOD)
		_newGetter(_data, mySelf, AS, function() {
			_as(mySelf)
		})
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
	function _createChildRoute(_data, mySelf, routeDefinition, name) {
		var SS = _data[SS]
		if (_data[CHILDS][name])
			_throwError(mySelf, ERROR_ROUTE_ALREADY_DEFINE, name)[
				(_Route, _Alias, _Resource, _Scope)
			].forEach(function(routeSubclass) {
				if (routeSubclass.is(routeDefinition, SS))
					routeDefinition = routeSubclass[DIGGEST](routeDefinition, SS, SS)
			})
		routeDefinition[SS + NAME] = name
		var routeTypes = {}
		routeTypes[ROUTE] = Route
		routeTypes[undefined] = Route
		routeTypes[_ALIAS] = Alias
		routeTypes[SCOPE] = Scope
		routeTypes[_RESOURCE] = Resource

		var newRoute = new routeTypes[routeDefinition[SS + TYPE]](
			mySelf,
			routeDefinition,
			SS,
			_data[ROOT]
		)
		_data[CHILDS][name] = newRoute
		_newGetter(
			mySelf,
			name,
			function() {
				return _data[CHILDS][name]
			},
			true
		)
	}

	function _constructor(args) {}
	_Route = Route
})()
