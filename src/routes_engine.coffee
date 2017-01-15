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
					parent[param[NAME]] = param[ALIAS]# @TODO improve this to match with path() output

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