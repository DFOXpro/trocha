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
	 * Print RESOURCE type routes
	 * diferences with Route.path: throw a warning if force don't return true
	 * @see _path
	 * @override
	 */
	path = (routeParams, force) =>
		_path(routeParams, this._data, function(myData, _) {
			if ('function' === typeof force && force() !== true)
				_throwWarning(undefined, WARNING_RESOURCE_AS_A_ROUTE)
			return false
		})
}
