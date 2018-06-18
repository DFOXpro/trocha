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

				# REMOVES parent ID if requested
				r = r.replace '/:' + parent[$ID], s if(
					parent[$ID] &&
					!routeParams[parent[$ID]] &&
					(
						(param[ID] == false) ||
						(routeParams[PARENT_ID] == false) ||
						(param[PARENT_ID] == false)
					)
				)
				# Replace given identifiers if false delete identifier like /(:id)/
				Object.keys(param).forEach (v) ->
					r = r.replace '/:' + v, s if param[v] == false && !routeParams[v]
				Object.keys(routeParams).forEach (v) ->
					if routeParams[v] == false
						r = r.replace '/:' + v, s
					else
						r = r.replace ':' + v, routeParams[v]

				# console.log param

				Object.keys(query).forEach (key, i, array) -> # Print query values
					if i == 0
						r += '?'
					r += encodeURIComponent(key) + '=' + encodeURIComponent(query[key]) + `(array.length - 1 !== i ? '&' : '')`
				r += '#' + encodeURIComponent(fragment) if fragment

				r
## END PREPARE PATH
## Next ROUTES ENGINE
