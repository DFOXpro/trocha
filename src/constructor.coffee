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
			_NEW_NAMES = [NEW_SCOPE, NEW_ROUTE, NEW_ALIAS, NEW_RESOURCE]
			if 'object' == typeof r # this means alias is steril, cant have child routes :v
				[newScope, newRoute, newAlias, newResource].forEach (newFunction, i)->
					# Those functions it's not getters, but this lines prevent overide
					Object.defineProperty r, _NEW_NAMES[i],
					get: -> newFunction
			r

		_prepareRoutes = (parent, routesJSON, SELECTOR)->
			_$ = SELECTOR || routes[$customSelector] || $
			# console.log '_prepareRoutes', parent, routesJSON, _$
			delete routesJSON[_$+TYPE]
			posibleRoutes = Object.keys routesJSON
			posibleRoutes.forEach (name)->
				route = routesJSON[name]
				if typeof route == 'string'
					parent[name] = route
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
