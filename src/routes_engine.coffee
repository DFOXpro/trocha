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