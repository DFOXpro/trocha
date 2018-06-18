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
					_defineParam = (_route, _param) ->
						delete _route[_$+TYPE]
						_param = _param || {}
						_param[NAME] = name
						if _route[_$+ID] != undefined
							_param[ID] = _route[_$+ID]
							delete _route[_$+ID]
						if _route[_$+PARENT_ID] == false
							_param[PARENT_ID] = false
							delete _route[_$+PARENT_ID]
						posibleDisabledParentIds = Object.keys _route
						posibleDisabledParentIds.forEach (pDPId) -> # posibleDisabledParentId
							# console.log parent.path(), pDPId if parent.path
							if _route[pDPId] == false && parent.path && parent.path().includes "/:#{pDPId}"
								_param[pDPId] = false
								delete _route[pDPId]
							else if _route[pDPId] == false
								console.error "Invalid parent Id #{pDPId} for #{_param[NAME]}"
						return _param

					if route[_$+TYPE] == SCOPE
						parent[NEW_SCOPE] _defineParam route
					else if route[_$+TYPE] == RESOURCE
						parent[NEW_RESOURCE] _defineParam route
					else # if route[_$+TYPE] == ROUTE || route[_$+TYPE] == undefined
						newRouteParam = {}
						if route[_$+HIDE]
							newRouteParam[HIDE] = route[_$+HIDE]
							delete route[_$+HIDE]
						delete route[_$+HIDE] if route[_$+HIDE] == false
						if route[_$+METHOD]
							newRouteParam[METHOD] = route[_$+METHOD]
							delete route[_$+METHOD]
						if route[_$+JUST_ID]
							newRouteParam[JUST_ID] = route[_$+JUST_ID]
							delete route[_$+JUST_ID]
						# if route[_$+AFTER_ID] # @TODO: FAILS and Needs docs
						# 	newRouteParam[AFTER_ID] = route[_$+AFTER_ID]
						# 	delete route[_$+AFTER_ID]
						# if route[_$+POSTFIX] # @TODO: FAILS and Needs docs
						# 	newRouteParam[POSTFIX] = route[_$+POSTFIX]
						# 	delete route[_$+POSTFIX]
						parent[NEW_ROUTE] _defineParam route, newRouteParam
					_prepareRoutes parent[name], route
				else
					console.error 'Did you mean', _$+name, '? Route definition must be Object(to route) or String(to alias) or Boolean(to disable parent Ids)'
					throw "TrochaJS error: [_prepareRoutes] invalid route definition. #{NAME} = #{name} in #{parent[NAME]}"
## END CONSTRUCTOR
## Next PREPARE PATH
