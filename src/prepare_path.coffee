		_preparePath = (parent, param)->
			(routeParams)->
				if !routeParams
					routeParams = {}
				if param[ALIAS]
					return param[ALIAS]

				r = `(routes[$domain] && !parent[PATH] && (routeParams[URL]||routes[$alwaysUrl]) ? routes[$domain] : s)` #url
				delete routeParams[URL]
				r += `((routeParams[PREFIX] || routeParams[EXTENDED]) && routes[$prefix] ? routes[$prefix] : s)` #prefix
				delete routeParams[PREFIX]

				r += `(parent[PATH] ? parent[PATH]({post:false}) : s)`
				hide = `(routeParams[HIDE] !== undefined ? routeParams[HIDE] : param[HIDE])` #same as parent
				#REMOVES parent ID if any
				if parent[$ID] && (param[ID] == false && !routeParams[ID]) || routeParams[PARENT_ID] == false
					r = r.replace '/:' + parent[$ID], s
				#just ID example: /asd/:asd/:qwe
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
				)` #postfix
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