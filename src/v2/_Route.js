let Route;
(() =>
/**
* The Class where all other route types inherit
* @class Route
*/
Route = function Route () {

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

};

_newAttribute(
	Route,
	TRIM_SELECTOR,
	/**
	 * Add the routes defined (those without the current selector) to the
	 * diggested routeDefinition(dest), note this only works with a selectorl else maybe
	 * it's from function creation route like _newScope
	 * @static
	 * @pure
	 * @side_effect dest
	 * @memberof Route
	 * @param {string} SS selectedSelector
	 * @param {object} src routeDefinition in
	 * @param {object} dest routeDefinition out
	 */
	function(IS, src, dest) {
		if (IS === '') return
		Object.keys(src).forEach(attribute => {
			if (attribute.slice(0, 2) !== IS) dest[attribute] = src[attribute]
			else _throwWarning(this, WARNING_ROUTE_ATTRIBUTE_NOT_SUPPORTED, attribute)
		})
	}
)

_newAttribute(
	Route,
	IS,
	/**
	 * Check if given routeDefinition is Route
	 * @param {object} routeDefinition -
	 * @param {string} SS - selectedSelector normally $
	 * @static
	 * @pure
	 * @memberof Route
	 * @return {boolean} routeDefinition is route?
	 */
	function (routeDefinition, SS) {
		return (
			routeDefinition[SS + TYPE] === ROUTE ||
			('object' === typeof routeDefinition &&
				routeDefinition[SS + TYPE] === undefined)
		)
	}
)

_newAttribute(
	Route,
	DIGGEST,
	/**
	 * This function serve 2 purposes:
	 * (With just first 3 params) Sanitize routeDefinition for ROUTE valid params (this behabior is override)
	 * (With full params) add <routeDefinition>.<IS><attributes> to <dest>.<SS><attributes> (this behabior is not inhered)
	 * @pure
	 * @sideEffect dest
	 * @static
	 * @tobe_overload
	 * @recursive 1 iteration
	 * @memberof Route
	 * @param {object} routeDefinition -
	 * @param {string} SS - selector to be return
	 * @param {string} IS - selector to be find
	 * @param {object} dest - another routeDefinition
	 * @param {array<string>} attributes - to be added from routeDefinition to dest
	 */
	function (routeDefinition, SS, IS, dest, attributes) {
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
			Route[TRIM_SELECTOR](IS, routeDefinition, r)
			return r
		}
	}
)

)()