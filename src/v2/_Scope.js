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
	 * Print SCOPE type routes
	 * diferences with Route.path: throw an error if force don't return true
	 * @see _path
	 * @override
	 */
	path = (routeParams, force) =>
		_path(routeParams, this.#data, function(myData, _) {
			if ('function' === typeof force && force() !== true)
				_throwError(undefined, ERROR_SCOPE_AS_A_ROUTE)
			return false
		})
}
