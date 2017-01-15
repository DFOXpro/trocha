this.trocha = (->
## Previous START
## START VARIABLES
	# Utility vars
	_ = '/'
	s = '' # Force string
	$ = '$'

	# Request method types
	OPTIONS = 'OPTIONS'
	GET = 'GET'
	HEAD = 'HEAD'
	POST = 'POST'
	PUT = 'PUT'
	PATCH = 'PATCH'
	DELETE = 'DELETE'
	TRACE = 'TRACE'
	CONNECT = 'CONNECT'

	# Route types
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
	ALIAS = 'alias'
	POSTFIX = 'post'
	EXTENDED = 'ext'
	METHOD = 'method'
	DOMAIN = 'domain'
	ROUTES = 'routes'
	JUST_ID = 'justId' # FAILS
	AFTER_ID = 'afterId' # FAILS
	PARENT_ID = 'parentId'
	ALWAYS_URL = 'alwaysUrl'
	ALWAYS_POST = 'alwaysPost'
	CUSTOM_SELECTOR = 'customSelector'

	# Route return attributes
	AS = $+'as'
	$ID = $+ID
	PATH = 'path'
	$NAME = $+NAME
	$METHOD = $+METHOD
	CUSTOM = '_custom'
	NEW_SCOPE = '_newScope'
	NEW_ROUTE = '_newRoute'
	NEW_RESOURCE = '_newResource'
	NEW_ALIAS = '_newAlias'

	# Main object return attributes
	$domain = $+DOMAIN
	$prefix = $+PREFIX
	$postfix = $+POSTFIX
	$alwaysUrl = $+ALWAYS_URL
	$alwaysPost = $+ALWAYS_POST
	$resource = $+RESOURCE.toLowerCase()
	$customSelector =$+CUSTOM_SELECTOR

	## private

	# BASIC RESOURCE
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
## END VARIABLES
## Next OBJECT DEFINITION

## Previous VARIABLES
## START OBJECT DEFINITION
	trochaReturn = (initParams) ->
		initParams = {} if !initParams
		routes = {}
## END OBJECT DEFINITION
## Next CONSTRUCTOR

## Previous OBJECT DEFINITION
## START CONSTRUCTOR
		_constructor = (initParams)->
			routes = _basicRouteReturn()
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
			if initParams[ALWAYS_URL]
				routes[$alwaysUrl] = initParams[ALWAYS_URL]
			if initParams[ALWAYS_POST]
				routes[$alwaysPost] = initParams[ALWAYS_POST]

			routes[CUSTOM] = (param, routeParam)->
				_preparePath({}, param)(routeParam)
			if initParams[ROUTES]
				_prepareRoutes routes, initParams[ROUTES]
			#console.info 'TrochaJS', routes
			routes

		_basicRouteReturn = (parent, param, optionals)->
			# console.log '_basicRouteReturn', parent, param, optionals
			optionals = {} if !optionals
			r = {} # _preparePath parent, param
			r = optionals[ROUTE] if optionals[ROUTE]
			_NEW_NAMES = [NEW_SCOPE, NEW_ROUTE, NEW_ALIAS, NEW_RESOURCE]
			if 'object' == typeof r # this means alias is steril, cant have child routes :v
				[newScope, newRoute, newAlias, newResource].forEach (newFunction, i)->
					# Those functions it's not getters, but this lines prevent overide
					Object.defineProperty r, _NEW_NAMES[i],
					get: -> newFunction

			if(parent && param)
				r[PATH] = _preparePath parent, param
				r[$NAME] = param[NAME]
				r[AS] = as parent, param
				r[$METHOD] = (param[METHOD] || GET) if optionals[METHOD]
				r[$ID] = param[ID] if optionals[ID] && param[ID]
				parent[param[NAME]] = r

			# ?? this attributes need be write disable?
			# Object.defineProperty r, PATH,
			# get: -> _preparePath parent, param
			# Object.defineProperty r, $NAME,
			# get: -> param[NAME]
			# Object.defineProperty r, AS,
			# get: -> as parent, param
			# Object.defineProperty parent, r[$NAME],
			# get: -> r
			r

		_prepareRoutes = (parent, routesJSON, SELECTOR)->
			_$ = SELECTOR || routes[$customSelector] || $
			# console.log '_prepareRoutes', parent, routesJSON, _$
			delete routesJSON[_$+TYPE]
			posibleRoutes = Object.keys routesJSON
			posibleRoutes.forEach (name)->
				route = routesJSON[name]
				if typeof route == 'string'
					newAliasParam = {}
					newAliasParam[NAME] = name
					newAliasParam[ALIAS] = route
					parent[NEW_ALIAS] newAliasParam
				else if typeof route == 'object'
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
					else # if route[_$+TYPE] == ROUTE || route[_$+TYPE] == undefined
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
						if route[_$+POSTFIX]
							newRouteParam[POSTFIX] = route[_$+POSTFIX]
							delete route[_$+POSTFIX]
						parent[NEW_ROUTE] newRouteParam
					_prepareRoutes parent[name], route
				else
					console.error 'Did you mean', _$+name, '? Route definition must be Object or String'
					throw 'TrochaJS error: [_prepareRoutes] invalid route definition. ' + NAME + ' = ' + name + ' in ' + parent[NAME]
## END CONSTRUCTOR
## Next PREPARE PATH

## Previous CONSTRUCTOR
## START PREPARE PATH
		_preparePath = (parent, param) ->
			(routeParams) -> # The actual path function
				if !routeParams
					routeParams = {}
				if param[ALIAS]
					return param[ALIAS]

				r = `(routes[$domain] && !parent[PATH] && (routeParams[URL]||routes[$alwaysUrl]) ? routes[$domain] : s)` # url
				delete routeParams[URL]
				r += `((routeParams[PREFIX] || routeParams[EXTENDED]) && routes[$prefix] ? routes[$prefix] : s)` # prefix
				delete routeParams[PREFIX]

				r += `(parent[PATH] ? parent[PATH]({post:false}) : s)`
				hide = `(routeParams[HIDE] !== undefined ? routeParams[HIDE] : param[HIDE])` # same as parent
				# REMOVES parent ID if any
				if parent[$ID] && (param[ID] == false && !routeParams[ID]) || routeParams[PARENT_ID] == false
					r = r.replace '/:' + parent[$ID], s
				# just ID example: /asd/:asd/:qwe
				if (routeParams[JUST_ID] != false) && (param[JUST_ID] && param[ID])
					r += _ + ':' + param[ID]
				else
					noIdentifier = `(!param[ID] ? true : routeParams[ID] === false ? true : false)`
					r += `(hide? s : _ + param[NAME])`
					r += `(noIdentifier ? s : _ + ':' + param[ID])`

				r += `(
					routes[$postfix] &&
					routeParams[POSTFIX] != false &&
					!hide &&
					(routes[$alwaysPost] || param[POSTFIX] || routeParams[POSTFIX] || routeParams[EXTENDED])
					? routes[$postfix] : s
				)` # postfix
				delete routeParams[POSTFIX]
				query = {}
				if routeParams.query
					query = JSON.parse JSON.stringify routeParams.query
					delete routeParams.query
				if routeParams.fragment
					fragment = routeParams.fragment
					delete routeParams.fragment

				Object.keys(routeParams).forEach (v) -> # Replace given identifiers if false delete identifier like /(:id)/
					if routeParams[v] == false
						r = r.replace '/:' + v, s
					else
						r = r.replace ':' + v, routeParams[v]

				Object.keys(query).forEach (key, i, array) -> # Print query values
					if i == 0
						r += '?'
					r += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]) + `(array.length - 1 !== i ? '&' : '')`
				r += '#' + encodeURIComponent(fragment) if fragment

				r
## END PREPARE PATH
## Next ROUTES ENGINE

## Previous PREPARE PATH
## START ROUTES ENGINE
		as = (parent, param) ->
			pas = parent[AS]
			`(!pas ? '' : pas + '_')` + param[NAME]

		newScope = (param) ->
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
				_basicRouteReturn parent, param
				# r = _basicRouteReturn parent, param
				delete parent[param[NAME]][NEW_SCOPE] # Prevent consecutive scope, why?
				# console.log 'newScope', r, parent, param

		newAlias = (param) ->
			if !param
				console.info 'Trocha.newAlias(
					{
						'+NAME+':String,
						'+ALIAS+':String[,
						'+METHOD+':String(Default = GET)]
					}
				)'
			else if !param[NAME]
				console.error 'Trocha.newAlias given parameters: ', param
				throw 'Trocha.newAlias: Missing ' + NAME
			else if typeof param[NAME] != 'string'
				console.error 'Trocha.newAlias given parameters: ', param
				throw 'Trocha.newAlias: require String ' + NAME
			else if param[ALIAS]
				if typeof param[ALIAS] != 'string'
					console.error 'Trocha.newAlias given parameters: ', param
					throw 'Trocha.newAlias: require String ' + ALIAS
				else
					parent = this
					args = {}
					args[ROUTE] = param[ALIAS] # @TODO If string cant add methods
					# args[ROUTE] = {}
					# Object.defineProperty args, ROUTE,
					# get: -> param[ALIAS]
					_basicRouteReturn parent, param, args
					# r = _basicRouteReturn parent, param, args
					# console.log 'newAlias', r, parent, param
					
			else
				console.error 'Trocha.newAlias given parameters: ', param
				throw 'Trocha.newAlias: Missing ' + ALIAS

		newRoute = (param) ->
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
				throw 'Trocha.newRoute: Missing ' + NAME
			else if typeof param[NAME] != 'string'
				console.error 'Trocha.newRoute given parameters: ', param
				throw 'Trocha.newRoute: require String ' + NAME
			else if param[ALIAS]
				if typeof param[ALIAS] != 'string'
					console.error 'Trocha.newRoute given parameters: ', param
					throw 'Trocha.newRoute: require String ' + ALIAS
				else
					newAlias param
			else
				parent = this
				args = {}
				args[METHOD] = true
				args[ID] = true
				_basicRouteReturn parent, param, args
				# r = _basicRouteReturn parent, param, args
				# console.log 'newRoute', r, parent, param

		newResource = (param) ->
			if !param
				console.info 'newResource({' + NAME + ':String, ' + ID + ':String [, ' + RESOURCE + ':Object]})'
			else if typeof param != 'object'
				throw 'Trocha.newResource: require Object input'
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
## END ROUTES ENGINE
## Next RETURN
## Previous ROUTES ENGINE
## START RETURN
	# Request method types
	[
		# Request method types
		OPTIONS, GET, HEAD, POST, PUT, PATCH, DELETE, TRACE, CONNECT
		# Route types
		RESOURCE, ROUTE, SCOPE
	].forEach (attribute)->
		Object.defineProperty trochaReturn, attribute,
		get: -> attribute
	# Basic resource
	Object.defineProperty trochaReturn, $+RESOURCE,
		get: -> _basicResource

	trochaReturn
## END RETURN
## Next END

)()
#window.trocha = this.trocha

