path(routeParams = {}, customNameFun) {
	const
		myData = this.#data,
		parent = myData.parent || {},
		rootData = myData.root,
		SS = myData.SS,
		_formatID = _FORMAT_ID_FUN(rootData[ID_MODE])
	let r = s

	if (myData[NAME] === undefined) return ''

	// 1 print the domain
	r =
		rootData[DOMAIN] &&
		// !parent[PATH] &&
		routeParams[URL] !== false &&
		(routeParams[URL] || rootData[ALWAYS_URL])
			? rootData[DOMAIN]
			: s
	delete routeParams[URL]

	// 2 add the prefix
	r +=
		rootData[PREFIX] && (routeParams[PREFIX] || routeParams[EXTENDED])
			? rootData[PREFIX]
			: s
	delete routeParams[PREFIX]

	// 3 print parent paths
	let parentPathArg = {}
	let parentPathResponse = parent[PATH](parentPathArg, () => true)
	let thisIsChildPath = !! parentPathResponse
	// 3.1 enable firstSeparator
	let _ = (thisIsChildPath || rootData[FIRST_SEPARATOR]) ? rootData[SEPARATOR] : s
	parentPathArg[POSTFIX] = false
	r += parentPathResponse

	// 4.A print name & id(name) from customNameFun like Alias
	let hide =
		routeParams[HIDE] !== undefined
			? routeParams[HIDE]
			: myData[HIDE] || (myData[JUST_ID] && myData[DEFAULT_ID] === false)
	let customNameFromInhered
	if ('function' === typeof customNameFun)
		customNameFromInhered = customNameFun(myData, _)
	if ('string' === typeof customNameFromInhered) r += customNameFromInhered
	else {
		// 4.B print default name & id(name)
		let myId = _formatID(myData[ID])
		if (
			// 4.B.1 justId case
			routeParams[JUST_ID] !== false &&
			(myData[JUST_ID] && myData[ID] && myData[myData[ID]] !== false)
		) {
			r += _ + myId
		} else {
			// 4.B.2 hide case
			let noIdentifier = myData[ID] ? routeParams[ID] === false : true
			r += hide ? s : _ + myData[NAME]
			r += noIdentifier ? s : rootData[SEPARATOR] + myId
		}
	}

	// 5 add the postfix
	/**
	 * @TODO Document hide also remove postfix
	 */
	r +=
		rootData[POSTFIX] &&
		!hide &&
		routeParams[POSTFIX] !== false &&
		(rootData[ALWAYS_POST] ||
			myData[POSTFIX] ||
			routeParams[POSTFIX] ||
			routeParams[EXTENDED])
			? rootData[POSTFIX]
			: s
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
	if (
		parent[SS + ID] &&
		!routeParams[parent[SS + ID]] &&
		(myData[ID] === false ||
			routeParams[PARENT_ID] === false ||
			myData[PARENT_ID] === false)
	)
		r = r.replace(_formatID(parent[SS + ID], rootData[_PREID]), s)

	// 6.2 Remove parents Ids designed in constructor
	Object.keys(myData).forEach(idName => {
		if (myData[idName] === false && !routeParams[idName])
			return (r = r.replace(_formatID(idName, rootData[_PREID]), s))
	})

	// 6.2 RoR selected Ids in path params
	Object.keys(routeParams).forEach(idName => {
		if (routeParams[idName] === false)
			// Remove
			r = r.replace(_formatID(idName, rootData[_PREID]), s)
		// Replace
		else r = r.replace(_formatID(idName), routeParams[idName])
	})

	// 7 Now add the query
	Object.keys(query).forEach(function(key, i, array) {
		if (i === 0) r += '?'
		if (Array.isArray(query[key]))
			query[key].forEach(
				(value, _i) =>
					(r +=
						encodeURIComponent(key) +
						'[]=' +
						encodeURIComponent(value) +
						(query[key].length - 1 !== _i || array.length - 1 !== i ? '&' : ''))
			)
		else
			r +=
				encodeURIComponent(key) +
				'=' +
				encodeURIComponent(query[key]) +
				(array.length - 1 !== i ? '&' : '')
	})

	// 8 Now add the fragment
	if (fragment) r += '#' + encodeURIComponent(fragment)

	return r
}
