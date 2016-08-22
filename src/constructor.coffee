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
			if initParams[ALWAYS_URL]
				routes[$alwaysUrl] = initParams[ALWAYS_URL]

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