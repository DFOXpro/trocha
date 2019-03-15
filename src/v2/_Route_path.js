path(routeParams = {}, customNameFun) {
	let myData = this.#data
	let parent = myData.parent || {}
	let rootData = myData.root
	let SS = myData.SS
	let r = s

	if(myData[NAME]=== undefined) return ''

	// 1 print the domain
	r = (
		rootData[DOMAIN] &&
		// !parent[PATH] &&
		routeParams[URL] !== false &&
		(routeParams[URL] || rootData[ALWAYS_URL])
	)? rootData[DOMAIN] : s
	delete routeParams[URL]

	// 2 add the prefix
	r += (
		rootData[PREFIX] &&
		(routeParams[PREFIX] || routeParams[EXTENDED])
	) ? rootData[PREFIX] : s
	delete routeParams[PREFIX]

	// 3 print parent paths
	let parentPathArg = {}
	parentPathArg[POSTFIX] = false
	r += parent[PATH] ? parent[PATH](parentPathArg) : s

	// 4.A print name & id(name) from customNameFun like Alias
	let hide = (routeParams[HIDE] !== undefined ? routeParams[HIDE] : myData[HIDE])
	if(customNameFun) r += customNameFun(myData)
	// 4.B print default name & id(name)
	else {
		let myId = ':' + myData[ID]
		if ( // 4.B.1 justId case
			(routeParams[JUST_ID] !== false) && (myData[JUST_ID] && myData[ID])
		) {
			r += _ + myId
		} else { // 4.B.2 hide case
			let noIdentifier = (!myData[ID] ? true : routeParams[ID] === false ? true : false)
			r += (hide? s : _ + myData[NAME])
			r += (noIdentifier ? s : _ + myId)
		}
	}

	// 5 add the postfix
	/**
	 * @TODO Document hide also remove postfix
	 */
	r += (
		rootData[POSTFIX] &&
		!hide &&
		routeParams[POSTFIX] !== false &&
		(rootData[ALWAYS_POST] || myData[POSTFIX] || routeParams[POSTFIX] || routeParams[EXTENDED])
	)	? rootData[POSTFIX] : s
	delete routeParams[POSTFIX]

	// Note next 2 step first clear the routeParams then later on print the colected data
	// 7-1 get query part(also know as search... the ?asd=1 part)
	let query = {}
	if (routeParams[QUERY]) {
		query = JSON.parse(JSON.stringify(routeParams[QUERY]))
		delete routeParams[QUERY]
	}

	// 8-1 get fragment part(also know as anchor... the #asd part)
	let fragment = s
	if (routeParams[FRAGMENT]) {
		fragment = routeParams[FRAGMENT]
		delete routeParams[FRAGMENT]
	}

	// 6 Replace Or Remove(RoR) Ids

	// 6.1 RoR parentId
	let preId = '/:'
	if (
		parent[SS+ID] &&
		!routeParams[parent[SS+ID]] &&
		((myData[ID] === false) || (routeParams[PARENT_ID] === false) ||
		(myData[PARENT_ID] === false))
	) r = r.replace(preId + parent[SS+ID], s)

	// 6.2 Remove parents Ids designed in constructor
	Object.keys(myData).forEach((idName) => {
		if (myData[idName] === false && !routeParams[idName])
			return r = r.replace(preId + idName, s)
	})

	// 6.2 RoR selected Ids in path params
	Object.keys(routeParams).forEach((idName) => {
		if (routeParams[idName] === false) // Remove
			r = r.replace(preId + idName, s)
		else // Replace
			r = r.replace(':' + idName, routeParams[idName])
	})

	// 7 Now add the query
	Object.keys(query).forEach(function(key, i, array) {
		if (i === 0) r += '?'
		if(Array.isArray(query[key]))
			query[key].forEach((value, _i)=>(
				r += encodeURIComponent(key) + '[]=' + encodeURIComponent(value) + ((
					(query[key].length - 1 !== _i) ||
					(array.length - 1 !== i)
				)? '&' : '')
			))
		else
			r += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]) + (array.length - 1 !== i ? '&' : '')
	})

	// 8 Now add the fragment
	if (fragment) r += '#' + encodeURIComponent(fragment)

	return r
}
