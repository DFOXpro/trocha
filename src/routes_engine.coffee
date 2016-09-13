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
				#console.log 'newScope', parent, param
				r = {}
				r[$NAME] = param[NAME]
				r[PATH] = _preparePath parent, param
				r[AS] = as parent, param
				r[NEW_ROUTE] = newRoute
				r[NEW_RESOURCE] = newResource
				parent[r[$NAME]] = r

		newRoute = (param) ->
			parent = this
			#console.log 'newRoute', parent, param
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
					parent[param[NAME]] = param[ALIAS]
			else
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

		newResource = (param) ->
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