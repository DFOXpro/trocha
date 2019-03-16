class Route {
	#data = {
		parent: null,
		childs: {},
		SS: DS, // selectedSelector
		// next just for root
		alwaysPost: false,
		alwaysUrl: false,
		domain: '',
		post: '',
		pre: '',
	}
	#anyParentHasThisId = (mySelf, id) =>{
		let SS = mySelf.#data.SS
		if(!mySelf.#data.parent) return false
		return (
			(mySelf.#data.parent[SS+ID] === id) ||
			(mySelf.#anyParentHasThisId(mySelf.#data.parent, id))
		)
	}
	#newGetter = (mySelf, attribute, fun, skipSelector) =>{
		let SS = skipSelector? '' : mySelf.#data.SS
		Object.defineProperty(mySelf, SS+attribute, {
			get() {
				if(fun) return fun()
				else return mySelf.#data[attribute]
			},
			enumerable: true,
			configurable: false
		})
	}
	#defineMyAttributes = (mySelf, posibleRouteDef) => {
		let SS = mySelf.#data.SS
		let _setAndDisposeAttribute = (attribute) => {
			mySelf.#data[attribute] = posibleRouteDef[SS+attribute]
			delete posibleRouteDef[SS+attribute]
		}

		_setAndDisposeAttribute(NAME)
		_setAndDisposeAttribute(ID)
		_setAndDisposeAttribute(TYPE)
		_setAndDisposeAttribute(METHOD)

		_setAndDisposeAttribute(ALIAS)
		_setAndDisposeAttribute(RESOURCE)

		_setAndDisposeAttribute(HIDE)
		_setAndDisposeAttribute(JUST_ID)
		_setAndDisposeAttribute(PARENT_ID)
		if(false === posibleRouteDef[mySelf.#data.parent[SS+ID]])
			_setAndDisposeAttribute(mySelf.#data.parent[SS+ID])
		mySelf.#newGetter(mySelf, NAME)
		mySelf.#newGetter(mySelf, ID) // @TODO DOCUMENT ME, TEST ME
		mySelf.#newGetter(mySelf, METHOD)
		mySelf.#newGetter(mySelf, AS, ()=>(mySelf.#as(mySelf)))
	}

	#createChildRoute = (mySelf, routeDefinition, name) => {
		let SS = mySelf.#data.SS
		if(mySelf.#data.childs[name])
			_throwError(mySelf, ERROR_ROUTE_ALREADY_DEFINE, name)
		if(Alias.isAlias(routeDefinition, SS))
			routeDefinition = Alias.diggestAlias(routeDefinition, SS, SS)
		if(Resource.isResource(routeDefinition, SS))
			routeDefinition = Resource.diggestResource(routeDefinition, SS, SS)

		routeDefinition[SS+NAME] = name
		let routeTypes = {}
		routeTypes[ROUTE] = Route
		routeTypes[undefined] = Route
		routeTypes[_ALIAS] = Alias
		routeTypes[SCOPE] = Route // Scope
		routeTypes[_RESOURCE] = Resource

		let newRoute = new routeTypes[routeDefinition[SS+TYPE]](
			mySelf, routeDefinition, SS, mySelf.#data.root
		)
		mySelf.#data.childs[name] = newRoute
		mySelf.#newGetter(mySelf, name, ()=>(mySelf.#data.childs[name]), true)
	}
	#diggestChildRoutes = (mySelf, argChildRoutes, skipResource) => {
		if(
			!skipResource &&
			mySelf.#data[TYPE] === _RESOURCE
		){
			let SS = mySelf.#data.SS
			let resourceChilds = mySelf.#data[RESOURCE]
			delete resourceChilds[SS+ID]
			mySelf.#diggestChildRoutes(mySelf, resourceChilds, true)
		}
		let posibleChildRoutesNames = Object.keys(argChildRoutes)
		while(posibleChildRoutesNames.length){
			let posibleChild = posibleChildRoutesNames.pop()
			if( // This case disable any parentId
				(argChildRoutes[posibleChild] ===  false) &&
				mySelf.#anyParentHasThisId(mySelf, posibleChild)
			) mySelf.#data[posibleChild] = false
			else{
				mySelf.#createChildRoute(mySelf, argChildRoutes[posibleChild], posibleChild)
			}
		}
	}
	
	#as = (mySelf) => {
		let SS = mySelf.#data.SS
		return mySelf.#data.parent[SS+AS]? `${mySelf.#data.parent[SS+AS]}_${mySelf.#data[NAME]}` : mySelf.#data[NAME]
	}

	constructor(
		myParent,
		argRouteDef,
		argCustomSelector,
		argRoot,
		// Arguments for root Route
		argChildRoutes = {},
		argDomain,
		argAlwaysUrl,
		argPre,
		argPost,
		argAlwaysPost,
		//argAlwaysPre,// @TODO
	) {
		let SS = this.#data.SS = argCustomSelector || DS // selectedSelector
		const DEFAULT_ROUTE_DEF = {}
		DEFAULT_ROUTE_DEF[SS+METHOD] = GET
		DEFAULT_ROUTE_DEF[SS+TYPE] = ROUTE
		let posibleRouteDef = {...DEFAULT_ROUTE_DEF, ...argRouteDef}
		if(
			myParent ||
			posibleRouteDef[SS+NAME] &&
			posibleRouteDef[SS+METHOD] &&
			posibleRouteDef[SS+TYPE]
		){ // It's a normal route
			this.#data.parent = myParent
			this.#data.root = argRoot
			this.#defineMyAttributes(this, posibleRouteDef)
			this.#diggestChildRoutes(this, posibleRouteDef)
		} else { // It's the root route
			this.#data[DOMAIN] = argDomain || this.#data[DOMAIN]
			this.#newGetter(this, DOMAIN)
			this.#data[ALWAYS_URL] = argAlwaysUrl || this.#data[ALWAYS_URL]
			this.#data[ALWAYS_POST] = argAlwaysPost || this.#data[ALWAYS_POST]
			this.#data[POSTFIX] = argPost || this.#data[POSTFIX]
			this.#data[PREFIX] = argPre || this.#data[PREFIX]
			this.#data.root = this.#data
			delete this[PATH]
			/**
			 * @TODO Document
			 * Trocha({customSelector: 'ASD'}).ASDResource
			 */
			this.#newGetter(this, _RESOURCE, ()=>(_basicResource(SS)))
			this.#diggestChildRoutes(this, argChildRoutes)
		}
	}

	_newRoute = (args) => {
		let SS = this.#data.SS
		let newRoutArgs = {}
		newRoutArgs[SS+TYPE] = ROUTE
		newRoutArgs[SS+METHOD] = args[METHOD]
		newRoutArgs[SS+ID] = args[ID]
		newRoutArgs[SS+HIDE] = args[HIDE]
		newRoutArgs[SS+JUST_ID] = args[JUST_ID]
		this.#createChildRoute(this, newRoutArgs, args[NAME])
	}
	_newScope = (args) => {
		let SS = this.#data.SS
		let newRoutArgs = {}
		newRoutArgs[SS+TYPE] = SCOPE
		newRoutArgs[SS+ID] = args[ID]
		this.#createChildRoute(this, newRoutArgs, args[NAME])
	}
	_newAlias = (args) => {
		let SS = this.#data.SS
		args[TYPE] = _ALIAS
		if(!Alias.isAlias(args, '')) return false
		this.#createChildRoute(this, Alias.diggestAlias(args, SS, ''), args[NAME])
	}
	_newResource = (args) => {
		let SS = this.#data.SS
		args[TYPE] = _RESOURCE
		if(!Resource.isResource(args, '')) return false
		this.#createChildRoute(this, Resource.diggestResource(args, SS, ''), args[NAME])
	}

	include "_Route_path.js"

	toString = () => (this.#as(this))
}
