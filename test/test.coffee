testFramework = (options)->
	results = {
		running: null
		toTest: []
		asserts: 0
		badAsserts: 0
		total: 0
		bad: 0
	}

	r = {}
	r.it = (doString, itFun)->
		console.log doString
		itFun()

	r.describe = (title, describeFun)->
		desc =
			title: title
			fun: describeFun
			failWarning: ()->
				this.fail = true
				results.bad++
				console.error "#{this.title} test failed."
		desc.parent = results.running if results.running
		results.toTest.push desc
		results.total++

	r.assert = (result, expected)->
		assertFail = false
		results.asserts++
		bw = ", but was:"
		if 'object' == typeof expected
			if 'object' != typeof result
				assertFail = true
				console.error "Expected any object" + bw, result
		else if 'function' == typeof expected
			if 'function' != typeof result
				assertFail = true
				console.error "Expected any function" + bw, result
		else if result != expected
			assertFail = true
			console.error "Expected ", expected, bw, result
		if assertFail
			results.badAsserts++
			results.running.fail = true

	r.run = ()->
		while results.toTest.length > 0
			results.running = results.toTest.pop()
			console.info "Testing " + results.running.title
			try
				results.running.fun()
			catch e
				results.running.fail = true
				console.error "Exception caught", e
			if results.running.fail
				results.running.failWarning()
				if results.running.parent && !results.running.parent.fail
					results.running.parent.failWarning()
		console.log(
			"Of (#{results.asserts - results.badAsserts}/#{results.asserts}) assert",
			"(#{(results.total - results.bad)}/#{results.total}) tests, #{results.bad} failed"
		)
	r

	if options && options.global
		Object.keys(r).forEach (attr)->
			window[attr] = r[attr]

	r

test = testFramework {global: true}

(->
	describe 'Trocha JS Routes List engine', ->
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
				# it 'should create routes with after id', ->
				# 	r = trocha routes: simple_route_with_after_id:
				# 		$afterId: true
				# 		$id: 'simple_id'
				# 	assert r.simple_route_with_after_id.path(), '/:simple_id/simple_route_with_after_id'

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
				# it 'should create routes with postfix', ->
				# 	r = trocha routes: simple_route_post:
				# 		$post: 'the_post'
				# 	assert r.simple_route_post.path(), '/simple_route_postthe_post'

					# assert r.simple_id_route.path(simple_id: 'the_simple_id'), '/simple_id_route/the_simple_id'
					# assert r.simple_id_route.path(simple_id: false), '/simple_id_route'

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
				# assert r.simple_alias, {} # will fail
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

		describe 'Constants returns', ->
			it 'should be no editable', ->
				trocha.ROUTE = "Atack!"
				trocha.OPTIONS = "Atack!"
				trocha.$RESOURCE = "Atack!"
				assert trocha.ROUTE, "ROUTE"
				assert trocha.OPTIONS, "OPTIONS"
				assert trocha.$RESOURCE, {}
			it 'should return HTTP request methods types', ->
				assert trocha.OPTIONS, "OPTIONS"
				assert trocha.GET, "GET"
				assert trocha.HEAD, "HEAD"
				assert trocha.POST, "POST"
				assert trocha.PUT, "PUT"
				assert trocha.PATCH, "PATCH"
				assert trocha.DELETE, "DELETE"
				assert trocha.TRACE, "TRACE"
				assert trocha.CONNECT, "CONNECT"
			it 'should return default resource tree', ->
				assert trocha.$RESOURCE, {
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
				assert trocha.ROUTE, "ROUTE"
				assert trocha.SCOPE, "SCOPE"
				assert trocha.RESOURCE, "RESOURCE"
		describe 'Constructor', ->
			it 'should create a valid trocha object', ->
				assert trocha, ->
				r = trocha()
				assert r, {}
				assert r._custom, ->
				assert r._newResource, ->
				assert r._newRoute, ->
				assert r._newScope, ->
)()

test.run()


