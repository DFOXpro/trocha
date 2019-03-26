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
		return super.path(routeParams, function(myData) {
			if ('function' === typeof force && force() !== true)
				_throwError(undefined, ERROR_SCOPE_AS_A_ROUTE)
			return false
		})
	}
}
