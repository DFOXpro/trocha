class Resource extends Route {
	constructor(...args) {
		super(...args)
	}

	static diggestResource(routeDefinition, SS, IS) {
		let r = {}
		r[SS+TYPE] = _RESOURCE
		r[SS+RESOURCE] = routeDefinition[IS+RESOURCE] || _basicResource(SS)
		r[SS+METHOD] = routeDefinition[IS+METHOD]
		r[SS+ID] = routeDefinition[IS+ID]
		return r
	}

	static isResource(routeDefinition, SS) {
		return (
				routeDefinition[SS+TYPE] === _RESOURCE &&
				routeDefinition[SS+ID] // &&
				// routeDefinition[SS+RESOURCE]
		)
	}

	/**
	 * @override
	 */
	path(routeParams = {}, force){
		return super.path(routeParams, function (myData) {
			if(
				("function" === typeof force) &&
				(force() !== true)
			) _throwWarning(undefined, WARNING_RESOURCE_AS_A_ROUTE)
			return false
		})
	}
}
