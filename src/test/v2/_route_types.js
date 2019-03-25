describe('Route types', function() {
	it('should create a route(type route)', function() {
		var r
		r = new Trocha({
			routes: {
				simple_route: {
					$type: Trocha.ROUTE
				},
				simple_route_with_id: {
					$id: 'my_id',
					$type: Trocha.ROUTE
				},
				simple_route_with_method: {
					$method: Trocha.POST
				},
				The: {
					quick: {
						brown: {
							fox: {
								jumps: {
									over: {
										the: {
											lazy: {
												dog: {}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}) // I miss CS in lines like this
		assert.isObject(r.simple_route)
		assert.equal(r.simple_route.constructor.name, 'Route')
		assert.equal(r.simple_route.path(), '/simple_route')
		assert.equal(r.simple_route_with_id.path(), '/simple_route_with_id/:my_id')
		assert.equal(r.simple_route_with_method.$method, 'POST')
		assert.equal(r.The.quick.brown.path(), '/The/quick/brown')
		assert.equal(
			r.The.quick.brown.fox.jumps.over.the.lazy.dog.path(),
			'/The/quick/brown/fox/jumps/over/the/lazy/dog'
		)
		assert.equal(
			r.The.quick.brown.fox.jumps.over.the.lazy.dog.$as,
			'The_quick_brown_fox_jumps_over_the_lazy_dog'
		)
		r._newRoute({
			name: 'route_from_method'
		})
	})
	it('should create an alias(route type alias)', function() {
		var r
		r = new Trocha({
			routes: {
				quick_alias: 'a.flash/alias',
				simple_alias: {
					$type: Trocha.ALIAS,
					$alias: 'the.simple.alias'
				},
				simple_alias_with_id: {
					$type: Trocha.ALIAS,
					$alias: 'the.simple.alias/with/id',
					$id: 'my_id'
				},
				simple_alias_with_method: {
					$type: Trocha.ALIAS,
					$alias: 'the.simple.alias/with?method',
					$method: Trocha.POST
				},
				The: {
					quick: {
						brown: {
							fox: {
								jumps: {
									over: {
										the: {
											lazy: {
												dog: 'cat'
											}
										}
									}
								}
							}
						}
					}
				}
			}
		})
		assert.isObject(r.simple_alias)
		assert.equal(r.simple_alias.constructor.name, 'Alias')
		assert.equal(r.quick_alias.path(), 'a.flash/alias')
		assert.equal(r.simple_alias.path(), 'the.simple.alias')
		assert.equal(
			r.simple_alias_with_id.path(),
			'the.simple.alias/with/id/:my_id'
		)
		assert.equal(
			r.simple_alias_with_method.path(),
			'the.simple.alias/with?method'
		)
		assert.equal(r.simple_alias_with_method.$method, 'POST')
		assert.equal(
			r.The.quick.brown.fox.jumps.over.the.lazy.dog.path(),
			'/The/quick/brown/fox/jumps/over/the/lazy/cat'
		)
		assert.equal(
			r.The.quick.brown.fox.jumps.over.the.lazy.dog.$as,
			'The_quick_brown_fox_jumps_over_the_lazy_dog'
		)
		r._newAlias({
			name: 'method_alias',
			alias: 'asd',
			id: 'qwe',
			method: Trocha.PATCH
		})
		r.The.quick.brown.fox.jumps.over.the.lazy._newAlias({
			name: 'cat',
			alias: 'tigger'
		})
		assert.equal(
			r.The.quick.brown.fox.jumps.over.the.lazy.cat.path(),
			'/The/quick/brown/fox/jumps/over/the/lazy/tigger'
		)
		assert.equal(r.method_alias.path(), 'asd/:qwe')
		assert.equal(r.method_alias.$method, 'PATCH')
	})
	it('should create an resource(routes tree resource)', function() {
		var r
		r = new Trocha({
			routes: {
				products: {
					$type: Trocha.RESOURCE,
					$id: 'product_id'
				}
			}
		})
		assert.equal(r.products.constructor.name, 'Resource')
		assert.equal(r.products.list.constructor.name, 'Route')
		assert.equal(r.products.list.path(), '/products')
		assert.equal(r.products['new'].path(), '/products/new')
		assert.equal(r.products.show.path(), '/products/:product_id')
		assert.equal(r.products.edit.path(), '/products/:product_id/edit')
		r._newResource({
			name: 'services',
			id: 'service_id'
		})
		assert.equal(r.services.list.path(), '/services')
		assert.equal(r.services['new'].path(), '/services/new')
		assert.equal(r.services.show.path(), '/services/:service_id')
		assert.equal(r.services.edit.path(), '/services/:service_id/edit')
		it('should create a custom resource', function() {
			r = new Trocha({
				routes: {
					products: {
						$type: Trocha.RESOURCE,
						$id: 'product_id',
						$resource: {
							create: {
								$method: Trocha.POST,
								$parentId: false,
								$hide: true
							},
							read: {
								$hide: true
							},
							update: {
								$method: Trocha.PATCH,
								$hide: true
							},
							delete: {
								$method: Trocha.DELETE,
								$hide: true
							}
						}
					}
				}
			})
			assert.equal(r.products.constructor.name, 'Resource')
			assert.equal(r.products.create.constructor.name, 'Route')
			assert.equal(r.products.create.path(), '/products')
			assert.equal(r.products.create.$method, 'POST')
			assert.equal(r.products.read.path(), '/products/:product_id')
			assert.equal(r.products.read.$method, 'GET')
			assert.equal(r.products.update.path(), '/products/:product_id')
			assert.equal(r.products.update.$method, 'PATCH')
			assert.equal(r.products['delete'].path(), '/products/:product_id')
			assert.equal(r.products['delete'].$method, 'DELETE')
			r._newResource({
				name: 'services',
				id: 'service_id'
			})
			assert.equal(r.services.list.path(), '/services')
			assert.equal(r.services['new'].path(), '/services/new')
			assert.equal(r.services.show.path(), '/services/:service_id')
			assert.equal(r.services.edit.path(), '/services/:service_id/edit')
		})
	})
	it('should create an scope(route type scope)', function() {
		var r
		r = new Trocha({
			routes: {
				language: {
					$type: Trocha.SCOPE,
					$id: 'language_id',
					products: {
						$type: Trocha.RESOURCE,
						$id: 'product_id'
					}
				}
			}
		})
		assert.equal(r.language.constructor.name, 'Scope')
		assert.throws(r.language.path)
		assert.equal(r.language.products.list.path(), '/:language_id/products')
		assert.equal(
			r.language.products.list.path({
				language_id: false
			}),
			'/products'
		)
		assert.equal(r.products.list.path(), '/products')
		assert.equal(
			r.language.products.list.path({
				language_id: 'es'
			}),
			'/es/products'
		)
		r._newScope({
			name: 'lingua',
			id: 'lingua_id',
			hide: false
		})
		r.lingua._newResource({
			name: 'services',
			id: 'service_id'
		})
	})
})
