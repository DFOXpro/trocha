class Alias extends Route {
	constructor(...args) {
		super(...args)
	}

	/**
	 * @override
	 */
	static diggest(routeDefinition, SS, IS) {
		let r = {}
		r[SS+TYPE] = _ALIAS
		r[SS+ALIAS] = routeDefinition[IS+ALIAS] || routeDefinition
		r[SS+METHOD] = routeDefinition[IS+METHOD] || Route.DEFAULT_METHOD
		Route.diggest(routeDefinition, SS, IS, r, [
			ID, POSTFIX, PARENT_ID
		])
		if("string" !== typeof routeDefinition)
			Route._trimSelector(IS, routeDefinition, r)
		return r
	}

	/**
	 * @override
	 */
	static is(routeDefinition, SS) {
		return (
			("string" === typeof routeDefinition) ||
			(
				routeDefinition[SS+TYPE] === _ALIAS &&
				routeDefinition[SS+ALIAS]
			)
		)
	}

	/**
	 * @override
	 */
	path(routeParams = {}){
		return super.path(routeParams, function (myData) {
			// Note Alias dnt support hide nor justId in creation
			let r = s
			let myId = _ + ':' + myData[ID]
			let parent = myData.parent || {}
			let rootData = myData.root

			if (myData[ID] && routeParams[JUST_ID]) {
				r += myId
			} else {
				let useID = (!!myData[ID] && routeParams[myData[ID]] !== false)
				r += parent.constructor.name === "Trocha" ? s : _
				r += (routeParams[HIDE]? s : myData[ALIAS])
				r += (useID ? myId : s)
			}
			return r
		})
	}
}
