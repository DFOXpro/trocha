this.trocha = (()->
##START VARIABLES
	#Utility vars
	_ = '/'
	s = '' # Force string
	$ = '$'

	#Request method types
	OPTIONS = 'OPTIONS'
	GET = 'GET'
	HEAD = 'HEAD'
	POST = 'POST'
	PUT = 'PUT'
	PATCH = 'PATCH'
	DELETE = 'DELETE'
	TRACE = 'TRACE'
	CONNECT = 'CONNECT'

	#Route types
	ROUTE = 'ROUTE'
	SCOPE = 'SCOPE'
	RESOURCE = 'RESOURCE'

	# Input attributes
	ID = 'id'
	NAME = 'name'
	HIDE = 'hide'
	URL = 'url'
	TYPE = 'type'
	PREFIX = 'pre'
	POSTFIX = 'post'
	EXTENDED = 'ext'
	METHOD = 'method'
	DOMAIN = 'domain'
	ROUTES = 'routes'
	JUST_ID = 'justId' #FAILS
	AFTER_ID = 'afterId' #FAILS
	PARENT_ID = 'parentId'
	CUSTOM_SELECTOR = 'customSelector'

	#Route return attributes
	AS = $+'as'
	$ID = $+ID
	PATH = 'path'
	$NAME = $+NAME
	$METHOD = $+METHOD
	CUSTOM = '_custom'
	NEW_SCOPE = '_newScope'
	NEW_ROUTE = '_newRoute'
	NEW_RESOURCE = '_newResource'

	#Main object return attributes
	$domain = $+DOMAIN
	$prefix = $+PREFIX
	$postfix = $+POSTFIX
	$resource = $+RESOURCE.toLowerCase()
	$customSelector =$+CUSTOM_SELECTOR

	##private

	#BASIC RESOURCE
	_show = 'show'
	_edit = 'edit'
	_new = 'new'
	_list = 'list'
	_basicResource = {}
	_basicResource[$+ID] = ID
	_basicResource[_show] = {}
	_basicResource[_edit] = {}
	_basicResource[_new] = {}
	_basicResource[_list] = {}
	_basicResource[_show][$+HIDE] = true
	_basicResource[_new][$+ID] = false
	_basicResource[_list][$+ID] = false
	_basicResource[_list][$+HIDE] = true
##END VARIABLES
	trochaReturn = (initParams)->
		routes = {}

##START CONSTRUCTOR
		_constructor = (initParams)->
			if initParams[DOMAIN]
				routes[$domain] = s + initParams[DOMAIN]
			if initParams[PREFIX]
				routes[$prefix] = s + initParams[PREFIX]
			if initParams[POSTFIX]
				routes[$postfix] = s + initParams[POSTFIX]
			if initParams[RESOURCE.toLowerCase()]
				routes[$resource] = initParams[RESOURCE.toLowerCase()]
			if initParams[CUSTOM_SELECTOR]
				routes[$customSelector] = initParams[CUSTOM_SELECTOR]

			routes[NEW_SCOPE] = newScope
			routes[NEW_ROUTE] = newRoute
			routes[NEW_RESOURCE] = newResource
			routes[CUSTOM] = (param, routeParam)->
				_preparePath({}, param)(routeParam)
			if initParams[ROUTES]
				_prepareRoutes routes, initParams[ROUTES]
			#console.info 'TrochaJS', routes
			routes

		_prepareRoutes = (parent, routesJSON, SELECTOR)->
			_$ = SELECTOR || routes[$customSelector] || $
			#console.log '_prepareRoutes', parent, routesJSON, _$
			#window.alert('asd')
			delete routesJSON[_$+TYPE]
			posibleRoutes = Object.keys routesJSON
			posibleRoutes.forEach (name)->
				route = routesJSON[name]
				if typeof route != 'object'
					console.error 'Did you mean', _$+name, '? Route definition must be Object'
					throw 'TrochaJS error: [_prepareRoutes] invalid route definition. name = ' + name
				if route[_$+TYPE] == SCOPE
					newScopeParam = {}
					newScopeParam[NAME] = name
					if route[_$+ID] != undefined
						newScopeParam[ID] = route[_$+ID]
						delete route[_$+ID]
					parent[NEW_SCOPE] newScopeParam
				else if route[_$+TYPE] == RESOURCE
					newResourceParam = {}
					newResourceParam[NAME] = name
					if route[_$+ID] != undefined
						newResourceParam[ID] = route[_$+ID]
						delete route[_$+ID]
					parent[NEW_RESOURCE] newResourceParam
				else #if route[_$+TYPE] == ROUTE || route[_$+TYPE] == undefined
					newRouteParam = {}
					newRouteParam[NAME] = name
					if route[_$+ID] != undefined
						newRouteParam[ID] = route[_$+ID]
						delete route[_$+ID]
					if route[_$+METHOD]
						newRouteParam[METHOD] = route[_$+METHOD]
						delete route[_$+METHOD]
					if route[_$+JUST_ID]
						newRouteParam[JUST_ID] = route[_$+JUST_ID]
						delete route[_$+JUST_ID]
					if route[_$+AFTER_ID]
						newRouteParam[AFTER_ID] = route[_$+AFTER_ID]
						delete route[_$+AFTER_ID]
					if route[_$+HIDE]
						newRouteParam[HIDE] = route[_$+HIDE]
						delete route[_$+HIDE]
					parent[NEW_ROUTE] newRouteParam
				_prepareRoutes parent[name], route
##END CONSTRUCTOR
		_preparePath = (parent, param)->
			(routeParams)->
				if !routeParams
					routeParams = {}

				r = `(routeParams[URL] && routes[$domain] ? routes[$domain] : s)` #url
				delete routeParams[URL]
				r += `((routeParams[PREFIX] || routeParams[EXTENDED]) && routes[$prefix] ? routes[$prefix] : s)` #prefix
				delete routeParams[PREFIX]

				r += `(parent[PATH] ? parent[PATH]() : s) + _`
				#REMOVES parent ID if any
				if parent[$ID] && (param[ID] == false && !routeParams[ID]) || routeParams[PARENT_ID] == false
					r = r.replace '/:' + parent[$ID], s
				#just ID example: /asd/:asd/:qwe
				if (routeParams[JUST_ID] != false) && (param[JUST_ID] && param[ID])
					r += _ + ':' + param[ID]
				else
					hide = `(routeParams[HIDE] !== undefined ? routeParams[HIDE] : param[HIDE])` #same as parent
					noIdentifier = `(!param[ID] ? true : routeParams[ID] === false ? true : false)`
					r += `(hide? s : param[NAME])`
					r += `(noIdentifier ? s : _ + ':' + param[ID])`

				r += `((routeParams[POSTFIX]||routeParams[EXTENDED]) && routes[$postfix] ? routes[$postfix] : s)` #postfix
				delete routeParams[POSTFIX]
				query = fragment = {}
				if routeParams.query
					query = JSON.parse JSON.stringify routeParams.query
					delete routeParams.query
				if routeParams.fragment
					fragment = JSON.parse JSON.stringify routeParams.fragment
				delete routeParams.fragment
				Object.keys(routeParams).forEach (v)-> # Replace given identifiers if false delete identifier like /(:id)/
					if routeParams[v] == false
						r = r.replace '/:' + v, s
					else
						r = r.replace ':' + v, routeParams[v]

				Object.keys(query).forEach (key, i, array)->
					if i == 0
						r += '?'
					r += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]) + `(array.length - 1 !== i ? '&' : '')`
					#console.log r, v, routeParams[v]
				r

		as = (parent, param)->
			pas = parent[AS]
			`(!pas ? '' : pas + '_')` + param[NAME]

		newScope = (param)->
			if !param
				console.info 'newScope(
					{
						name:String
					}
				)'
			else if !param[NAME]
				console.error 'Trocha.newScope given parameters: ', param
				throw 'Trocha.newScope: Missing name'
			else if typeof param[NAME] != 'string'
				console.error 'Trocha.newScope given parameters: ', param
				throw 'Trocha.newScope: require String name'
			else
				parent = this
				#console.log 'newScope', parent, param
				r = {}
				r[$NAME] = param[NAME]
				r[PATH] = _preparePath parent, param
				r[AS] = as parent, param
				r[NEW_ROUTE] = newRoute
				r[NEW_RESOURCE] = newResource
				parent[r[$NAME]] = r

		newRoute = (param)->
			if !param
				console.info 'Trocha.newRoute(
					{
						'+NAME+':String,
						['+METHOD+':String(Default = GET),
						'+ID+':false|String,
						'+HIDE+':Boolean,
						'+JUST_ID+':Boolean,
						'+AFTER_ID+':Boolean]
					}
				)'
			else if !param[NAME]
				console.error 'Trocha.newRoute given parameters: ', param
				throw 'Trocha.newRoute: Missing name'
			else if typeof param[NAME] != 'string'
				console.error 'Trocha.newRoute given parameters: ', param
				throw 'Trocha.newRoute: require String name'
			else
				parent = this
				#console.log 'newRoute', parent, param
				r = {}
				r[$METHOD] = param[METHOD] || GET
				r[$NAME] = param[NAME]
				r[NEW_ROUTE] = newRoute
				r[NEW_RESOURCE] = newResource
				r[NEW_SCOPE] = newScope
				r[PATH] = _preparePath parent, param
				r[AS] = as parent, param
				if param[ID]
					r[$ID] = param[ID]
				parent[r[$NAME]] = r

		newResource = (param)->
			if !param
				console.info 'newRoute({' + NAME + ':String, ' + ID + ':String [, ' + RESOURCE + ':Object]})'
			else if typeof param != 'object'
				throw 'Trocha.newRoute: require Object input'
			else
				newRouteParam = {}
				if param[RESOURCE.toLowerCase()] || routes[$resource]
					newRouteParam[param[NAME]] = JSON.parse JSON.stringify param[RESOURCE.toLowerCase()] || routes[$resource]
					selector = routes[$customSelector] || $
				else
					newRouteParam[param[NAME]] = JSON.parse JSON.stringify _basicResource
					selector = $
				newRouteParam[param[NAME]][$+ID] = param[ID]
				_prepareRoutes this, newRouteParam, selector

		_constructor initParams
##START RETURN
	#Request method types
	trochaReturn.OPTIONS = OPTIONS
	trochaReturn.GET = GET
	trochaReturn.HEAD = HEAD
	trochaReturn.POST = POST
	trochaReturn.PUT = PUT
	trochaReturn.PATCH = PATCH
	trochaReturn.DELETE = DELETE
	trochaReturn.TRACE = TRACE
	trochaReturn.CONNECT = CONNECT
	#Route types
	trochaReturn[RESOURCE] = RESOURCE
	trochaReturn[ROUTE] = ROUTE
	trochaReturn[SCOPE] = SCOPE
	#Basic resource
	trochaReturn[$+RESOURCE] = JSON.parse JSON.stringify _basicResource
	trochaReturn
##END RETURN
)()
#window.trocha = this.trocha

