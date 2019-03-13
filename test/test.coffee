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
			Trocha.ROUTE = "Atack!"
			Trocha.OPTIONS = "Atack!"
			Trocha.$RESOURCE = "Atack!"
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
			assert r._custom, ->
			assert r._newResource, ->
			assert r._newRoute, ->
			assert r._newScope, ->

	constructor_test = undefined

routes_creation_test = ->
	describe 'Route creation', ->
		describe 'Route creation params', ->
			it 'should create routes without name printing', ->
				r = trocha routes: simple_route_without_name: $hide: true
				assert r.simple_route_without_name.path(), ''

			it 'should create routes with method', ->
				r = trocha routes: simple_route_with_method: $method: trocha.POST
				assert r.simple_route_with_method.$method, 'POST'

			it 'should create routes with id', ->
				r = trocha routes: simple_id_route: $id: 'simple_id'
				assert r.simple_id_route.path(), '/simple_id_route/:simple_id'

			it 'should create routes with hiden parent id', ->
				r = trocha routes: simple_id_route:
					$id: 'simple_id'
					without_parent_id: $id: false
				assert r.simple_id_route.without_parent_id.path(), '/simple_id_route/without_parent_id'

			it 'should create routes with just id', ->
				r = trocha routes: simple_route_with_just_id:
					$justId: true
					$id: 'simple_id'
				assert r.simple_route_with_just_id.path(), '/:simple_id'

			# will fail
			it 'should create routes with after id', ->
				r = trocha routes: simple_route_with_after_id:
					$afterId: true
					$id: 'simple_id'
				assert r.simple_route_with_after_id.path(), '/:simple_id/simple_route_with_after_id'

			it 'should create routes with hiden parents id and child id', ->
				r = trocha routes: simple_id_route:
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

			# will fail
			it 'should create routes with postfix', ->
				r = trocha routes: simple_route_post:
					$post: 'the_post'
				assert r.simple_route_post.path(), '/simple_route_postthe_post'

				assert r.simple_id_route.path(simple_id: 'the_simple_id'), '/simple_id_route/the_simple_id'
				assert r.simple_id_route.path(simple_id: false), '/simple_id_route'

		it 'should create routes via JSON Constructor', ->
			r = trocha
				routes:
					simple_route: {}
					simple_scope: {$type: trocha.SCOPE}
					simple_alias: "simple_alias"
					simple_resource:
						$type: trocha.RESOURCE
						$id: "simple_id" #resource must have ID

			assert r.simple_route, {}
			assert r.simple_scope, {}
			assert r.simple_resource, {}
			assert r.simple_alias, {} # will fail
			assert r.simple_alias, "simple_alias" # @TODO remove me after alias fix
		it 'should create routes via post init functions', ->
			r = trocha()
			r._newRoute {
				name: "simple_route"
			}
			r.simple_route._newRoute {
				name: "simple_route"
			}
			r._newScope {
				name: "simple_scope"
			}
			r._newResource {
				name: "simple_resource"
				id: "simple_id"
			}
			r._newAlias {
				name: "simple_alias"
				alias: "simple_alias"
			}
			assert r.simple_route, {}
			assert r.simple_route.simple_route, {}
			assert r.simple_scope, {}
			assert r.simple_resource, {}
			assert r.simple_alias, "simple_alias"

	routes_creation_test = undefined

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
		myRoutes = trocha _clone myRoutesParams
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
				_myRoutes = trocha _myRoutesParams
				assert _myRoutes.town.path(), 'https://mydomain.net.co/town/:town_name'
				assert _myRoutes.town.path(url: false), '/town/:town_name' # will fail

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
				_myRoutes = trocha _myRoutesParams
				assert _myRoutes.town.path(), '/town/:town_name-myH45H.html'
				assert _myRoutes.town.path(post: false), '/town/:town_name'

			it 'ext', ->
				# true (extended) print prefix and postfix.
				assert myRoutes.town.path(), '/town/:town_name'
				assert myRoutes.town.path(ext: true), '/templates/town/:town_name-myH45H.html'

			it 'hide', ->
				# true Hide the last name of the path, if an id is setted it will appears anyway.
				assert myRoutes.town.path(hide: true), '/:town_name'

			it 'parentId', ->
				# false Hide the parent route id.
				assert myRoutes.town.house.path(parentId: false), '/town/house/:address'

			it 'id', ->
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
				assert myRoutes.town.path(
					query:
						description: true
						pictures: 4
				), '/town/:town_name?description=true&pictures=4'

			it 'fragment', ->
				# String Print the fragment #<value>.
				assert myRoutes.town.path( fragment: 'references'), '/town/:town_name#references'

	function_path_test = undefined

(->
	describe 'Trocha JS Routes List engine', ->
		constants_test()
		constructor_test()
		# routes_creation_test()
		# function_path_test()
	test.run()
)()


