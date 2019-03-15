class Alias extends Route {
	constructor(...args) {
		super(...args)
	}
	static diggestAlias(routeDefinition, SS, IS) {
		let r = {}
		r[SS+TYPE] = _ALIAS
		r[SS+ALIAS] = routeDefinition[IS+ALIAS] || routeDefinition
		r[SS+METHOD] = routeDefinition[IS+METHOD]
		r[SS+ID] = routeDefinition[IS+ID]
		return r
	}
	static isAlias(routeDefinition, SS) {
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
