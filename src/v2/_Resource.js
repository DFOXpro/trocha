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
		return super.path(routeParams, function(myData) {
			if ('function' === typeof force && force() !== true)
				_throwWarning(undefined, WARNING_RESOURCE_AS_A_ROUTE)
			return false
		})
	}
}
