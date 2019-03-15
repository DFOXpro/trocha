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
