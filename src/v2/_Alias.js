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
	 * @see _path
	 * @override
	 */
	path = routeParams =>
		_path(routeParams, this.#data, function(myData, _) {
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
