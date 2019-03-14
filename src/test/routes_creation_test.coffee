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
