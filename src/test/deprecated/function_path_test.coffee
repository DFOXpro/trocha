function_path_test = ->
	describe 'function path', ->
		myRoutesParams =
			pre: '/templates' # note the /
			post: '-myH45H.html'
			domain: 'https://mydomain.net.co'
			routes:
				town:
					$id: 'town_name'
					house:
						$id: 'address'
		myRoutes = new Trocha _clone myRoutesParams
		describe 'path() diferent params', ->
			it 'no params', ->
				assertFunctionError myRoutes.path
				assert myRoutes.town.path(), '/town/:town_name'
				assert myRoutes.town.house.path(), '/town/:town_name/house/:address'

			it 'url', ->
				# true print domain if alwaysUrl is not set.
				assert myRoutes.town.path(), '/town/:town_name'
				assert myRoutes.town.path(url: true), 'https://mydomain.net.co/town/:town_name'
				# false dnt print domain if alwaysUrl is set.
				_myRoutesParams = _clone myRoutesParams
				_myRoutesParams.alwaysUrl = true
				_myRoutes = new Trocha _myRoutesParams
				assert _myRoutes.town.path(), 'https://mydomain.net.co/town/:town_name'
				assert _myRoutes.town.path(url: false), '/town/:town_name'

			it 'pre', ->
				# true print prefix.
				assert myRoutes.town.path(), '/town/:town_name'
				assert myRoutes.town.path(pre: true), '/templates/town/:town_name'

			it 'post', ->
				# <Boolean> if post: true print the postfix, if post: false(note just false not undefined nor null nor 0) will ignore alwaysPost route param.
				assert myRoutes.town.path(), '/town/:town_name'
				assert myRoutes.town.path(post: true), '/town/:town_name-myH45H.html'
				_myRoutesParams = _clone myRoutesParams
				_myRoutesParams.alwaysPost = true
				_myRoutes = new Trocha _myRoutesParams
				assert _myRoutes.town.path(), '/town/:town_name-myH45H.html'
				assert _myRoutes.town.path(post: false), '/town/:town_name'

			it 'ext', ->
				# true (extended) print prefix and postfix.
				assert myRoutes.town.path(), '/town/:town_name'
				assert myRoutes.town.path(ext: true), '/templates/town/:town_name-myH45H.html'

			it 'hide', ->
				# true Hide the last name of the path, if an id is setted it will appears anyway.
				assert myRoutes.town.path(hide: true), '/:town_name'
				_myRoutesParams = _clone myRoutesParams
				_myRoutesParams.routes.town.$hide = true
				_myRoutes = new Trocha _myRoutesParams
				assert _myRoutes.town.path(), '/:town_name'

			it 'parentId', ->
				# false Hide the parent route id.
				assert myRoutes.town.house.path(parentId: false), '/town/house/:address'

			it 'id: false', ->
				# false Hide the route id.
				assert myRoutes.town.path(id: false), '/town'
				assert myRoutes.town.house.path(id: false), '/town/:town_name/house'

			it '<someId>', ->
				# <someId>: String set the value of some id of the route.
				assert myRoutes.town.path(town_name: ''), '/town/'
				assert myRoutes.town.path(town_name: 'Engativá'), '/town/Engativá'
				assert myRoutes.town.house.path(address: 'calle_falsa'), '/town/:town_name/house/calle_falsa'
				assert myRoutes.town.house.path(address: 'calle_falsa',town_name: false), '/town/house/calle_falsa'

			it 'query', ->
				# {<attribute>:<value>} Print a define query ?<attribute>=<value>&....
				assert myRoutes.town.path( # test trivial case
					query: description: true
				), '/town/:town_name?description=true'
				assert myRoutes.town.path( # test multiple value case
					query:
						description: true
						pictures: 4
				), '/town/:town_name?description=true&pictures=4'
				assert myRoutes.town.path( # test array values case
					query:
						an_array: ['qwe', 'asd', 'zxc']
				), '/town/:town_name?an_array[]=qwe&an_array[]=asd&an_array[]=zxc'
				assert myRoutes.town.path( # test array values case
					query:
						an_array: ['qwe', 'asd', 'zxc']
						ert: 1
				), '/town/:town_name?an_array[]=qwe&an_array[]=asd&an_array[]=zxc&ert=1'
				assert myRoutes.town.path( # test posible breaking point
					query: "ata?&ck": "&#{}?=;:/\\ \t"
				), '/town/:town_name?ata%3F%26ck=%26%3F%3D%3B%3A%2F%5C%20%09'

			it 'fragment', ->
				# String Print the fragment #<value>.
				assert myRoutes.town.path( fragment: 'references'), '/town/:town_name#references'

	function_path_test = undefined
