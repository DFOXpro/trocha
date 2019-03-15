testFramework = (options) ->
	results =
		runningDescribe: null
		describesToTest: []
		asserts: 0
		badAsserts: 0
		totalBaseDescribes: 0
		total: 0
		bad: 0

	r = {}
	r.it = (doString, itFun) ->
		console.log doString
		try
			itFun()
		catch e
			console.error "BROKEN EXAMPLE " + doString
			console.error "Exception caught", e
		
	r.describe = (title, describeFun) ->
		successPromp = ->
			console.log "%c#{desc.title} test success.", "color: white; font-style: italic; background-color: green;padding: 1em"
		failWarning = ->
			desc.fail = true
			results.bad++
			console.log "%c#{desc.title} test failed.", "color: white; font-style: italic; background-color: red;padding: 1em"

		desc =
			title: ''
			fun: describeFun
			childsDescribes: []
			totalChilds: 0
			failWarning: failWarning
			successPromp: successPromp
		if results.runningDescribe
			desc.parent = results.runningDescribe
			desc.position = ++desc.parent.totalChilds
		else
			desc.parent = totalChilds: results.totalBaseDescribes
		results.total++

		_descNumeral = (_desc) ->
			desc.title = "#{_desc.position}.#{desc.title}" if _desc.position
			if _desc.parent
				_descNumeral _desc.parent
			else
				desc.title += " #{title}"
		_descNumeral desc

		if desc.parent.childsDescribes
			desc.parent.childsDescribes.push desc
		else
			results.describesToTest.push desc

	r.assertFunctionError = (faultyFunction, params, expectedException) ->
		try
			faultyFunction params
			results.badAsserts++
			results.runningDescribe.fail = true
			console.assert false, {expectedException: expectedException, msg: 'Expected error in function buts runs ok'}
		catch e
			# console.log 'Spected error was an error', e

	r.assert = (result, expected) ->
		assertFail = false
		results.asserts++
		errorMessage = ''
		if 'object' == typeof expected
			if 'object' != typeof result
				assertFail = true
				errorMessage = "Expected any object"
		else if 'function' == typeof expected
			if 'function' != typeof result
				assertFail = true
				errorMessage = "Expected any function"
		else if result != expected
			assertFail = true
			errorMessage = "Expected #{expected}, but was: #{result}"
		if assertFail
			results.badAsserts++
			results.runningDescribe.fail = true
			console.assert false, {expected: expected, result: result, msg: errorMessage}
		return assertFail

	r.run = ->
		_runDescribes = (describes) ->
			success = true
			while describes.length > 0
				_currentDescribe = results.runningDescribe = describes.shift()
				console.info "Testing " + results.runningDescribe.title
				try
					_currentDescribe.fun()
					success = false if !_runDescribes _currentDescribe.childsDescribes
					_currentDescribe.fail = true if !success
				catch e
					_currentDescribe.fail = true
					console.error "Exception caught", e
				if _currentDescribe.fail
					_currentDescribe.failWarning()
				else
					_currentDescribe.successPromp()
			return success
		_runDescribes results.describesToTest

		console.log(
			"Of (#{results.asserts - results.badAsserts}/#{results.asserts}) assert",
			"(#{(results.total - results.bad)}/#{results.total}) tests, #{results.bad} failed"
		)

	if options && options.global
		Object.keys(r).forEach (attr) ->
			window[attr] = r[attr]

	r

test = testFramework global: true

# Note this function does not clone functions
_clone = (object) ->
	JSON.parse JSON.stringify object

constants_test = ->
	describe 'Constants returns', ->
		it 'should be no editable', ->
			Trocha.ROUTE = "Atack!Route"
			Trocha.OPTIONS = "Atack!Option"
			Trocha.$RESOURCE = "Atack!$Resource"
			assert Trocha.ROUTE, "ROUTE"
			assert Trocha.OPTIONS, "OPTIONS"
			assert Trocha.$RESOURCE, {}
		it 'should return HTTP request methods types', ->
			assert Trocha.OPTIONS, "OPTIONS"
			assert Trocha.GET, "GET"
			assert Trocha.HEAD, "HEAD"
			assert Trocha.POST, "POST"
			assert Trocha.PUT, "PUT"
			assert Trocha.PATCH, "PATCH"
			assert Trocha.DELETE, "DELETE"
			assert Trocha.TRACE, "TRACE"
			assert Trocha.CONNECT, "CONNECT"
		it 'should return default resource tree', ->
			assert Trocha.$RESOURCE, {
				$id: 'id'
				show:
					$hide: true
				edit: {}
				new:
					$id: false
				list:
					$hide: true
					$id: false
			}
		it 'should return routes types', ->
			assert Trocha.ALIAS, "ALIAS"
			assert Trocha.SCOPE, "SCOPE"
			assert Trocha.ROUTE, "ROUTE"
			assert Trocha.RESOURCE, "RESOURCE"

	constants_test = undefined

constructor_test = ->
	describe 'Constructor', ->
		it 'should check trocha is a class object', ->
			# https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
			assert Trocha, ->
			r = new Trocha()
			assert Trocha.name, "Trocha"
		it 'should create a valid trocha object', ->
			r = new Trocha()
			assert r, {}
			assert r._newAlias, ->
			assert r._newResource, ->
			assert r._newRoute, ->
			assert r._newScope, ->
			assert r.$RESOURCE, {}
			assertFunctionError r.path

	constructor_test = undefined

base_variables = ->
	describe 'Base variables returns', ->
		it 'should set customSelector', ->
			r = new Trocha()
			assert r.$RESOURCE, {}
			assert r.$domain, ""
			r = new Trocha({customSelector: '$$'})
			assert r.$$RESOURCE, {}
			assert r.$$domain, ""
		it 'should set domain', ->
			r = new Trocha()
			assert r.$domain, ""
			r = new Trocha({domain: 'asd'})
			assert r.$domain, "asd"
	base_variables = undefined

routes_creation_test = ->
	describe 'Route creation', ->
		describe 'Route creation params', ->
			it 'should create trivial route', ->
				r = new Trocha routes: simple_route: {}
				assert r.simple_route.path(), '/simple_route'
			it 'should create routes without name printing', ->
				r = new Trocha routes: simple_route_without_name: $hide: true
				assert r.simple_route_without_name.path(), ''

			it 'should create routes with method', ->
				r = new Trocha routes: simple_route_with_method: $method: Trocha.POST
				assert r.simple_route_with_method.$method, 'POST'

			it 'should create routes with id', ->
				r = new Trocha routes: simple_id_route: $id: 'simple_id'
				assert r.simple_id_route.path(), '/simple_id_route/:simple_id'

			it 'should create routes with hiden parent id', ->
				r = new Trocha routes: simple_id_route:
					$id: 'simple_id'
					without_parent_id: $id: false
				assert r.simple_id_route.without_parent_id.path(), '/simple_id_route/without_parent_id'

			it 'should create routes with just id', ->
				r = new Trocha routes: simple_route_with_just_id:
					$justId: true
					$id: 'simple_id'
				assert r.simple_route_with_just_id.path(), '/:simple_id'

			# # will fail
			# it 'should create routes with after id', ->
			# 	r = new Trocha routes: simple_route_with_after_id:
			# 		$afterId: true
			# 		$id: 'simple_id'
			# 	assert r.simple_route_with_after_id.path(), '/:simple_id/simple_route_with_after_id'

			it 'should create routes with hiden parents id and child id', ->
				r = new Trocha routes: simple_id_route:
					$id: 'simple_id'
					hide_parent_id:
						$id: 'child_id'
						$parentId: false
					id_2:
						$id: 'child_id'
						$parentId: false
						hide_parents_id:
							child_id: false
						# overide_id:
						# 	simple_id: true # does not compute
						hide_glitch:
							$id: '$hide'
							# simple_id: ':$hide' # does not compute
							l:
								$hide: false # This will be ignore in constructor

				assert r.simple_id_route.hide_parent_id.path(), '/simple_id_route/hide_parent_id/:child_id'
				assert r.simple_id_route.id_2.hide_parents_id.path(), '/simple_id_route/id_2/hide_parents_id'
				#check Override
				assert r.simple_id_route.hide_parent_id.path(simple_id: 'asd'), '/simple_id_route/asd/hide_parent_id/:child_id'
				assert r.simple_id_route.id_2.hide_parents_id.path(child_id: 'asd'), '/simple_id_route/id_2/asd/hide_parents_id'
				# assert r.simple_id_route.id_2.overide_id.path(), '/simple_id_route/asd/id_2/:child_id/overide_id'
				assert r.simple_id_route.id_2.hide_glitch.l.path(), '/simple_id_route/id_2/:child_id/hide_glitch/:$hide/l'

			it 'should create routes with prefix', ->
				r = new Trocha
					pre: '.the_pre.'
					routes: simple_route_pre: {}
				assert r.simple_route_pre.path(), '/simple_route_pre'
				assert r.simple_route_pre.path({pre: true}), '.the_pre./simple_route_pre'
				assert r.simple_route_pre.path({ext: true}), '.the_pre./simple_route_pre'
			it 'should create routes with postfix', ->
				r = new Trocha
					post: '.the_post'
					alwaysPost: true
					routes: simple_route_post: {}
				assert r.simple_route_post.path(), '/simple_route_post.the_post'
				r = new Trocha
					post: '.the_post'
					routes: simple_route_post: {}
				assert r.simple_route_post.path(), '/simple_route_post'
				assert r.simple_route_post.path({post: true}), '/simple_route_post.the_post'
				assert r.simple_route_post.path({ext: true}), '/simple_route_post.the_post'

		it 'should create routes via JSON Constructor', ->
			r = new Trocha
				routes:
					simple_route: {}
					simple_scope: {$type: Trocha.SCOPE}
					simple_alias: "simple_alias"
					simple_resource:
						$type: Trocha.RESOURCE
						$id: "simple_id" #resource must have ID

			assert r.simple_route, {}
			assert r.simple_scope, {}
			assert r.simple_resource, {}
			assert r.simple_alias, {}

		it 'should create routes via post init functions', ->
			r = new Trocha()
			r._newRoute {
				name: "simple_route"
			}
			assert r.simple_route, {}
			r.simple_route._newRoute {
				name: "simple_route"
			}
			assert r.simple_route.simple_route, {}
			r._newScope {
				name: "simple_scope"
			}
			assert r.simple_scope, {}
			r._newResource {
				name: "simple_resource"
				id: "simple_id"
			}
			assert r.simple_resource, {}
			r._newAlias {
				name: "simple_alias"
				alias: "simple_alias"
			}
			assert r.simple_alias, {}

	routes_creation_test = undefined

route_types_test = ->
	describe 'Route types', ->
		it 'should create a route(type route)', ->
			r = new Trocha
				routes:
					simple_route:
						$type: Trocha.ROUTE
					simple_route_with_id:
						$id: 'my_id'
						$type: Trocha.ROUTE
					simple_route_with_method:
						$method: Trocha.POST
					The:
						quick:
								brown:
										fox:
												jumps:
														over:
																the:
																		lazy:
																				dog: {}
			assert r.simple_route, {}
			assert r.simple_route.constructor.name, "Route"
			assert r.simple_route.path(), '/simple_route'
			assert r.simple_route_with_id.path(), '/simple_route_with_id/:my_id'
			assert r.simple_route_with_method.$method, 'POST'
			assert r.The.quick.brown.path(), '/The/quick/brown'
			assert r.The.quick.brown.fox.jumps.over.the.lazy.dog.path(), '/The/quick/brown/fox/jumps/over/the/lazy/dog'
			assert r.The.quick.brown.fox.jumps.over.the.lazy.dog.$as, 'The_quick_brown_fox_jumps_over_the_lazy_dog'
			r._newRoute
				name: 'route_from_method'
		it 'should create an alias(route type alias)', ->
			r = new Trocha
				routes:
					quick_alias: 'a.flash/alias'
					simple_alias:
						$type: Trocha.ALIAS
						$alias: 'the.simple.alias'
					simple_alias_with_id:
						$type: Trocha.ALIAS
						$alias: 'the.simple.alias/with/id'
						$id: 'my_id'
					simple_alias_with_method:
						$type: Trocha.ALIAS
						$alias: 'the.simple.alias/with?method'
						$method: Trocha.POST
					The:
						quick:
								brown:
										fox:
												jumps:
														over:
																the:
																		lazy:
																				dog: 'cat'
			assert r.simple_alias, {}
			assert r.simple_alias.constructor.name, "Alias"
			assert r.quick_alias.path(), 'a.flash/alias'
			assert r.simple_alias.path(), 'the.simple.alias'
			assert r.simple_alias_with_id.path(), 'the.simple.alias/with/id/:my_id'
			assert r.simple_alias_with_method.path(), 'the.simple.alias/with?method'
			assert r.simple_alias_with_method.$method, 'POST'
			assert r.The.quick.brown.fox.jumps.over.the.lazy.dog.path(), '/The/quick/brown/fox/jumps/over/the/lazy/cat'
			assert r.The.quick.brown.fox.jumps.over.the.lazy.dog.$as, 'The_quick_brown_fox_jumps_over_the_lazy_dog'
			r._newAlias({
				name: 'method_alias'
				alias: 'asd'
				id: 'qwe'
				method:Trocha.PATCH
			})
			r.The.quick.brown.fox.jumps.over.the.lazy._newAlias({
				name: 'cat'
				alias: 'tigger'
			})
			assert r.The.quick.brown.fox.jumps.over.the.lazy.cat.path(), '/The/quick/brown/fox/jumps/over/the/lazy/tigger'
			assert r.method_alias.path(), 'asd/:qwe'
			assert r.method_alias.$method, 'PATCH'
		it 'should create an resource', ->
			r = new Trocha
				routes:
					products:
						$type: Trocha.RESOURCE
						$id: "product_id"
			assert r.products.list.path(), '/products'
			assert r.products.new.path(), '/products/new'
			assert r.products.show.path(), '/products/:product_id'
			assert r.products.edit.path(), '/products/:product_id/edit'
			r._newResource
				name: "services"
				id: "service_id"
			assert r.services.list.path(), '/services'
			assert r.services.new.path(), '/services/new'
			assert r.services.show.path(), '/services/:service_id'
			assert r.services.edit.path(), '/services/:service_id/edit'
			window.asd = r

		it 'should create an scope(route type scope)', ->
			# window.asd = r
		# it 'should create a valid trocha object', ->
		# 	r = new Trocha()
		# 	assert r, {}
		# 	assert r._newAlias, ->
		# 	assert r._newResource, ->
		# 	assert r._newRoute, ->
		# 	assert r._newScope, ->
		# 	assert r.$RESOURCE, {}
		# 	assertFunctionError r.path

	route_types_test = undefined

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

(->
	describe 'Trocha JS Routes List engine', ->
		constants_test()
		constructor_test()
		base_variables()
		routes_creation_test()
		route_types_test()
		function_path_test()
	test.run()
)()


