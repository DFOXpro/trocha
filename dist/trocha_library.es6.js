/** @license trocha@0.2.0 - 2019-03-17
* Trocha.js 
* 
* This source code is licensed under the Mozillas Public license 2.0 found in the 
* LICENSE file in the root directory of this source tree. 
*/
/**
 * This file is intended for non module enviorements
 * Works like JQuery or legacy angular
 * Note the parent can be within a clousure or be self(window or worker)
 */
((parent) => {
/* Begin: src/v2/_core.js */
	// Utility methods
/* Begin: src/v2/_utils.js */
	/**
	 * Intended to declare any (class)method to be override from an instance
	 * @throws {not_implemented_method} The method was not override
	 */
	function _IntanceMethodHelper (){
		throw new Error('not implemented')
	}

	let _throwError = (scope, error_text, value) => {
		class TrochaError extends Error {
			constructor(scope, error_text, value) {
				// Pass remaining arguments (including vendor specific ones) to parent constructor
				super(ERROR_HEADER+error_text)
				
				// Custom debugging information
				this.scope = scope
				this.value = value
			}
		}
		throw new TrochaError(scope, error_text, value)
	}

	let _throwWarning = (scope, warning_text, value) => {
		console.warn(WARNING_HEADER+warning_text, value||s, scope||s)
	}
/* End: src/v2/_utils.js */
	// Const used abroad the library
/* Begin: src/v2/_variables.js */
	/*
	 * Why variables are outside the Trocha class?
	 * Because private variables are still not supported
	 * and because Route share a lot of symbols with Trocha
	 */

	// Utility vars
	const _ = '/'
	const s = '' // Force string
	const DS = '$' // DEFAULT_SELECTOR

	// Request method types
	const OPTIONS = 'OPTIONS'
	const GET = 'GET'
	const HEAD = 'HEAD'
	const POST = 'POST'
	const PUT = 'PUT'
	const PATCH = 'PATCH'
	const DELETE = 'DELETE'
	const TRACE = 'TRACE'
	const CONNECT = 'CONNECT'

	// Route types
	const ROUTE = 'ROUTE'
	const SCOPE = 'SCOPE'
	const _RESOURCE = 'RESOURCE'
	const _ALIAS = 'ALIAS'

	// Input attributes
	const ID = 'id'
	const URL = 'url'
	const NAME = 'name'
	const HIDE = 'hide'
	const TYPE = 'type'
	const PREFIX = 'pre'
	const ALIAS = 'alias'
	const QUERY = 'query'
	const POSTFIX = 'post'
	const EXTENDED = 'ext'
	const METHOD = 'method'
	const DOMAIN = 'domain'
	const ROUTES = 'routes'
	const JUST_ID = 'justId'
	// const AFTER_ID = 'afterId' // FAILS & no DOCS
	const FRAGMENT = 'fragment'
	const RESOURCE = 'resource'
	const PARENT_ID = 'parentId'
	const DEFAULT_ID = `defaultId`
	const ALWAYS_URL = 'alwaysUrl'
	const ALWAYS_POST = 'alwaysPost'
	const CUSTOM_SELECTOR = 'customSelector'

	// Route return attributes
	const AS = 'as'
	const PATH = 'path'
	// const NEW_SCOPE = '_newScope'
	// const NEW_ROUTE = '_newRoute'
	// const NEW_RESOURCE = '_newResource'
	// const NEW_ALIAS = '_newAlias'

	// Main object return attributes
	/**
	 * @TODO deprecate
	 * Reason: all those attributes can have customSelector
	 */
	// const $prefix = DS+PREFIX
	// const $postfix = DS+POSTFIX
	// const $alwaysUrl = DS+ALWAYS_URL
	// const $alwaysPost = DS+ALWAYS_POST
	// const $customSelector = DS+CUSTOM_SELECTOR

	//// static final

	// BASIC RESOURCE
	const _show = 'show'
	const _edit = 'edit'
	const _new = 'new'
	const _list = 'list'
	const _basicResource = (SS = DS)=>{ // selectedSelector
		const r = {}
		r[SS+ID] = ID
		r[_show] = {}
		r[_edit] = {}
		r[_new] = {}
		r[_list] = {}
		r[_show][SS+HIDE] = true
		r[_new][SS+ID] = false
		r[_list][SS+ID] = false
		r[_list][SS+HIDE] = true
		return r
	}

	const ERROR_HEADER = 'TrochaJS error: '
	const WARNING_HEADER = 'TrochaJS warning: '
	const ERROR_ROUTE_ALREADY_DEFINE = 'Route already declare'
	const ERROR_SCOPE_AS_A_ROUTE = 'Scope is not printable a route'
	const WARNING_RESOURCE_AS_A_ROUTE = 'Resource should not be used as a route'
	const WARNING_ROUTE_ATTRIBUTE_NOT_SUPPORTED = 'Attribute not supported, skiped'
/* End: src/v2/_variables.js */
	// Trocha class
/* Begin: src/v2/_Trocha.js */
	// Route classes
/* Begin: src/v2/_Route.js */
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
			_setAndDisposeAttribute(DEFAULT_ID)
			_setAndDisposeAttribute(TYPE)
			_setAndDisposeAttribute(METHOD)

			_setAndDisposeAttribute(ALIAS)
			_setAndDisposeAttribute(RESOURCE)

			_setAndDisposeAttribute(HIDE)
			_setAndDisposeAttribute(POSTFIX)
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
			let routeSubclasses = [Route, Alias, Resource, Scope]
			routeSubclasses.forEach((routeSubclass) => {
				if(routeSubclass.is(routeDefinition, SS))
					routeDefinition = routeSubclass.diggest(routeDefinition, SS, SS)
			})
			routeDefinition[SS+NAME] = name
			let routeTypes = {}
			routeTypes[ROUTE] = Route
			routeTypes[undefined] = Route
			routeTypes[_ALIAS] = Alias
			routeTypes[SCOPE] = Scope
			routeTypes[_RESOURCE] = Resource

			let newRoute = new routeTypes[routeDefinition[SS+TYPE]](
				mySelf, routeDefinition, SS, mySelf.#data.root
			)
			mySelf.#data.childs[name] = newRoute
			mySelf.#newGetter(mySelf, name, ()=>(mySelf.#data.childs[name]), true)
		}
		#diggestChildRoutes = (mySelf, argChildRoutes, skipResource) => {
			let SS = mySelf.#data.SS
			if(
				!skipResource &&
				mySelf.#data[TYPE] === _RESOURCE
			){
				let resourceChilds = mySelf.#data[RESOURCE]
				delete resourceChilds[SS+ID]
				mySelf.#diggestChildRoutes(mySelf, resourceChilds, true)
			}

			let posibleChildRoutesNames = Object.keys(argChildRoutes)
			while(posibleChildRoutesNames.length){
				let posibleChild = posibleChildRoutesNames.pop()
				if( // This case disable any <id>=false
					(argChildRoutes[posibleChild] ===  false) &&
					mySelf.#anyParentHasThisId(mySelf, posibleChild)
				) mySelf.#data[posibleChild] = false
				else{
					mySelf.#createChildRoute(mySelf, argChildRoutes[posibleChild], posibleChild)
					if(mySelf.#data[TYPE] === SCOPE) {
						let scopedChild = {...argChildRoutes[posibleChild]}
						scopedChild[SS+PARENT_ID] = false
						mySelf.#createChildRoute(mySelf.#data.parent, scopedChild, posibleChild)
					}
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
			if(
				myParent ||
				argRouteDef &&
				argRouteDef[SS+NAME] &&
				argRouteDef[SS+TYPE]
			){ // It's a normal route
				this.#data.parent = myParent
				this.#data.root = argRoot
				this.#defineMyAttributes(this, argRouteDef)
				this.#diggestChildRoutes(this, argRouteDef)
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
			args[TYPE] = ROUTE
			if(!Route.is(args, '')) return false
			this.#createChildRoute(this, Route.diggest(args,this.#data.SS, ''), args[NAME])
		}
		_newScope = (args) => {
			args[TYPE] = SCOPE
			if(!Scope.is(args, '')) return false
			this.#createChildRoute(this, Scope.diggest(args,this.#data.SS, ''), args[NAME])
		}
		_newAlias = (args) => {
			args[TYPE] = _ALIAS
			if(!Alias.is(args, '')) return false
			this.#createChildRoute(this, Alias.diggest(args,this.#data.SS, ''), args[NAME])
		}
		_newResource = (args) => {
			args[TYPE] = _RESOURCE
			if(!Resource.is(args, '')) return false
			this.#createChildRoute(this, Resource.diggest(args,this.#data.SS, ''), args[NAME])
		}

/* Begin: src/v2/_Route_path.js */
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
			r += parent[PATH] ? parent[PATH](parentPathArg, ()=>(true)) : s

			// 4.A print name & id(name) from customNameFun like Alias
			let hide = (routeParams[HIDE] !== undefined ? routeParams[HIDE] : (
				myData[HIDE] ||
				(myData[JUST_ID] && myData[DEFAULT_ID] === false)
			))
			let customNameFromInhered
			if("function" === typeof customNameFun) customNameFromInhered = customNameFun(myData)
			if("string" === typeof customNameFromInhered) r += customNameFromInhered
			else { // 4.B print default name & id(name)
				let myId = ':' + myData[ID]
				if ( // 4.B.1 justId case
					(routeParams[JUST_ID] !== false) &&
					(myData[JUST_ID] && myData[ID] && myData[myData[ID]] !== false)
				) {
					r += _ + myId
				} else { // 4.B.2 hide case
					let noIdentifier = (myData[ID] ? (routeParams[ID] === false) : true)
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
/* End: src/v2/_Route_path.js */

		toString = () => (this.#as(this))

		static DEFAULT_METHOD = GET
		/**
		 * @TOBE_OVERRIDE
		 * @param {object} routeDefinition -
		 * @param {string} SS -
		 */
		static is(routeDefinition, SS) {
			return (
				routeDefinition[SS+TYPE] === ROUTE ||
				(
					("object" === typeof(routeDefinition)) &&
					routeDefinition[SS+TYPE] === undefined
				)
			)
		}

		/**
		 * @TOBE_OVERRIDE
		 * @param {} routeDefinition -
		 * @param {} SS - selector to be return
		 * @param {} IS - selector to be find
		 */
		static diggest = (routeDefinition, SS, IS, dest, attributes) => {
			if(dest && attributes)
				attributes.forEach((attribute) => {
					dest[SS+attribute] = routeDefinition[IS+attribute]
				})
			else {
				let r = {}
				r[SS+TYPE] = ROUTE
				r[SS+METHOD] = routeDefinition[IS+METHOD] || Route.DEFAULT_METHOD
				Route.diggest(routeDefinition, SS, IS, r, [
					ID, HIDE, JUST_ID, POSTFIX, PARENT_ID
				])
				Route._trimSelector(IS, routeDefinition, r)
				return r
			}
		}

		static _trimSelector = (SS, src, dest) => {
			Object.keys(src).forEach((attribute) => {
				if(attribute.slice(0,2) !== SS)
					dest[attribute] = src[attribute]
				else _throwWarning(this, WARNING_ROUTE_ATTRIBUTE_NOT_SUPPORTED, attribute)
			})
		}
	}
/* End: src/v2/_Route.js */
/* Begin: src/v2/_Alias.js */
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
/* End: src/v2/_Alias.js */
/* Begin: src/v2/_Resource.js */
	class Resource extends Route {
		constructor(...args) {
			super(...args)
		}

		/**
		 * @override
		 */
		static diggest(routeDefinition, SS, IS) {
			let r = {}
			r[SS+TYPE] = _RESOURCE
			r[SS+RESOURCE] = routeDefinition[IS+RESOURCE] || _basicResource(SS)
			Route.diggest(routeDefinition, SS, IS, r, [ID])
			Route._trimSelector(IS, routeDefinition, r)
			return r
		}

		/**
		 * @override
		 */
		static is(routeDefinition, SS) {
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
/* End: src/v2/_Resource.js */
/* Begin: src/v2/_Scope.js */
	class Scope extends Route {
		constructor(...args) {
			super(...args)
		}

		/**
		 * @override
		 */
		static diggest(routeDefinition, SS, IS) {
			let r = {}
			r[SS+TYPE] = SCOPE
			r[SS+JUST_ID] = true
			r[SS+DEFAULT_ID] = routeDefinition[IS+DEFAULT_ID] || false
			Route.diggest(routeDefinition, SS, IS, r, [ID, HIDE])
			Route._trimSelector(IS, routeDefinition, r)
			return r
		}

		/**
		 * @override
		 */
		static is(routeDefinition, SS) {
			return (
				("object" === typeof(routeDefinition)) &&
				routeDefinition[SS+TYPE] === SCOPE &&
				routeDefinition[SS+ID] // Should scope always have id????
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
				) _throwError(undefined, ERROR_SCOPE_AS_A_ROUTE)
				return false
			})
		}
	}
/* End: src/v2/_Scope.js */

	class Trocha extends Route{
		constructor(args = {}) {
			super(
				null, null, //Because it's the root
				args.customSelector,
				null,
				args.routes,
				args.domain,
				args.alwaysUrl,
				args.pre,
				args.post,
				args.alwaysPost,
				//args.alwaysPre,/**@TODO
			)
		}

		/*
		 * STATIC AVAILABLE ATTRIBUTES
		 */
		 /*
		 * Offers all the route types
		 */
		static get ROUTE(){return ROUTE}
		static get SCOPE(){return SCOPE}
		static get RESOURCE(){return _RESOURCE}
		static get ALIAS(){return _ALIAS}

		/*
		 * Offers all the request types
		 */
		static get OPTIONS(){return OPTIONS}
		static get GET(){return GET}
		static get HEAD(){return HEAD}
		static get POST(){return POST}
		static get PUT(){return PUT}
		static get PATCH(){return PATCH}
		static get DELETE(){return DELETE}
		static get TRACE(){return TRACE}
		static get CONNECT(){return CONNECT}

		/*
		 * Offers basic resource structure
		 * @See Route constructor for custom selector
		 */
		static get $RESOURCE(){return _basicResource()}
	}
/* End: src/v2/_Trocha.js */
/* End: src/v2/_core.js */
	self.Trocha = Trocha//fucking babel
	parent.Trocha = Trocha
})(this)
