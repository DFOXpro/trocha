chai = require('chai')
Trocha = require('../../index.require.js')

var assert = chai.assert

describe('Trocha JS Routes List engine', ()=> {
	describe('Constants returns', () => {
		it('should be no editable', () => {
			try {
				Trocha.ROUTE = 'Atack!Route'
				Trocha.OPTIONS = 'Atack!Option'
				Trocha.$RESOURCE = 'Atack!$Resource'
			} catch (e) {
				console.info('babeled code will throw a get exception, continue')
			}
			assert.equal(Trocha.ROUTE, 'ROUTE')
			assert.equal(Trocha.OPTIONS, 'OPTIONS')
			assert.isObject(Trocha.$RESOURCE)
		})
		it('should return HTTP request methods types', () => {
			assert.equal(Trocha.OPTIONS, 'OPTIONS')
			assert.equal(Trocha.GET, 'GET')
			assert.equal(Trocha.HEAD, 'HEAD')
			assert.equal(Trocha.POST, 'POST')
			assert.equal(Trocha.PUT, 'PUT')
			assert.equal(Trocha.PATCH, 'PATCH')
			assert.equal(Trocha.DELETE, 'DELETE')
			assert.equal(Trocha.TRACE, 'TRACE')
			assert.equal(Trocha.CONNECT, 'CONNECT')
		})
		it('should return default resource tree', () => {
			assert.deepEqual(Trocha.$RESOURCE, {
				$id: 'id',
				show: {
					$hide: true,
				},
				edit: {},
				new: {
					$id: false,
				},
				list: {
					$hide: true,
					$id: false,
				},
			})
		})
		it('should return routes types', () => {
			assert.equal(Trocha.ALIAS, 'ALIAS')
			assert.equal(Trocha.SCOPE, 'SCOPE')
			assert.equal(Trocha.ROUTE, 'ROUTE')
			assert.equal(Trocha.RESOURCE, 'RESOURCE')
		})
	})

	describe('Constructor', () => {
		it('should check trocha is a class object', () => {
			var r
			assert.isFunction(Trocha)
			try {
				assert.equal(Trocha.name, 'Trocha')
			} catch (e) {
				console.info("IE don't support Class name , continue")
			}
			r = new Trocha()
			assert.instanceOf(r, Trocha)
		})
		return it('should create a valid trocha object', () => {
			var r
			r = new Trocha()
			assert.isObject(r)
			assert.isFunction(r._newAlias)
			assert.isFunction(r._newResource)
			assert.isFunction(r._newRoute)
			assert.isFunction(r._newScope)
			assert.isObject(r.$RESOURCE)
			assert.throws(r.path)
		})
	})

	describe('Base variables returns', function() {
		it('should set customSelector', function() {
			var r
			r = new Trocha()
			assert.isObject(r.$RESOURCE)
			assert.equal(r.$domain, '')
			r = new Trocha({
				customSelector: '$$',
			})
			assert.isObject(r.$$RESOURCE)
			return assert.equal(r.$$domain, '')
		})
		return it('should set domain', function() {
			var r
			r = new Trocha()
			assert.equal(r.$domain, '')
			r = new Trocha({
				domain: 'asd',
			})
			return assert.equal(r.$domain, 'asd')
		})
	})

	describe('Route creation', () => {
		it('should create routes via JSON Constructor', () => {
			var r
			r = new Trocha({
				routes: {
					simple_route: {},
					simple_scope: {
						$type: Trocha.SCOPE
					},
					simple_alias: 'simple_alias',
					simple_resource: {
						$type: Trocha.RESOURCE,
						$id: 'simple_id'
					}
				}
			})
			assert.isObject(r.simple_route)
			assert.isObject(r.simple_scope)
			assert.isObject(r.simple_resource)
			assert.isObject(r.simple_alias)
		})
		it('should create routes via post init s function', () => {
			var r
			r = new Trocha()
			r._newRoute({
				name: 'simple_route'
			})
			assert.isObject(r.simple_route)
			r.simple_route._newRoute({
				name: 'simple_route'
			})
			assert.isObject(r.simple_route.simple_route)
			r._newScope({
				name: 'simple_scope',
				id: 'my_id'
			})
			assert.isObject(r.simple_scope)
			r._newResource({
				name: 'simple_resource',
				id: 'simple_id'
			})
			assert.isObject(r.simple_resource)
			r._newAlias({
				name: 'simple_alias',
				alias: 'simple_alias'
			})
			assert.isObject(r.simple_alias)
		})
		describe('Route creation params', () => {
			it('should create trivial route', () => {
				var r
				r = new Trocha({
					routes: {
						simple_route: {}
					}
				})
				assert.equal(r.simple_route.path(), '/simple_route')
			})
			it('should create routes without name printing', () => {
				var r
				r = new Trocha({
					routes: {
						simple_route_without_name: {
							$hide: true
						}
					}
				})
				assert.equal(r.simple_route_without_name.path(), '')
			})
			it('should create routes with method', () => {
				var r
				r = new Trocha({
					routes: {
						simple_route_with_method: {
							$method: Trocha.POST
						}
					}
				})
				assert.equal(r.simple_route_with_method.$method, 'POST')
			})
			it('should create routes with id', () => {
				var r
				r = new Trocha({
					routes: {
						simple_id_route: {
							$id: 'simple_id'
						}
					}
				})
				assert.equal(r.simple_id_route.path(), '/simple_id_route/:simple_id')
			})
			it('should create routes with hiden parent id', () => {
				var r
				r = new Trocha({
					routes: {
						simple_id_route: {
							$id: 'simple_id',
							without_parent_id: {
								$id: false
							}
						}
					}
				})
				assert.equal(
					r.simple_id_route.without_parent_id.path(),
					'/simple_id_route/without_parent_id'
				)
			})
			it('should create routes with just id', () => {
				var r
				r = new Trocha({
					routes: {
						simple_route_with_just_id: {
							$justId: true,
							$id: 'simple_id'
						}
					}
				})
				assert.equal(r.simple_route_with_just_id.path(), '/:simple_id')
			})
			it('should create routes with hiden parents id and child id', () => {
				var r
				r = new Trocha({
					routes: {
						simple_id_route: {
							$id: 'simple_id',
							hide_parent_id: {
								$id: 'child_id',
								$parentId: false
							},
							id_2: {
								$id: 'child_id',
								$parentId: false,
								hide_parents_id: {
									child_id: false
								},
								hide_glitch: {
									$id: '$hide',
									l: {
										$hide: false
									}
								}
							}
						}
					}
				})
				assert.equal(
					r.simple_id_route.hide_parent_id.path(),
					'/simple_id_route/hide_parent_id/:child_id'
				)
				assert.equal(
					r.simple_id_route.id_2.hide_parents_id.path(),
					'/simple_id_route/id_2/hide_parents_id'
				)
				assert.equal(
					r.simple_id_route.hide_parent_id.path({
						simple_id: 'asd'
					}),
					'/simple_id_route/asd/hide_parent_id/:child_id'
				)
				assert.equal(
					r.simple_id_route.id_2.hide_parents_id.path({
						child_id: 'asd'
					}),
					'/simple_id_route/id_2/asd/hide_parents_id'
				)
				assert.equal(
					r.simple_id_route.id_2.hide_glitch.l.path(),
					'/simple_id_route/id_2/:child_id/hide_glitch/:$hide/l'
				)
			})
			it('should create routes with prefix', () => {
				var r
				r = new Trocha({
					pre: '.the_pre.',
					routes: {
						simple_route_pre: {}
					}
				})
				assert.equal(r.simple_route_pre.path(), '/simple_route_pre')
				assert.equal(
					r.simple_route_pre.path({
						pre: true
					}),
					'.the_pre./simple_route_pre'
				)
				assert.equal(
					r.simple_route_pre.path({
						ext: true
					}),
					'.the_pre./simple_route_pre'
				)
			})
			it('should create routes with postfix', () => {
				var r
				r = new Trocha({
					post: '.the_post',
					alwaysPost: true,
					routes: {
						simple_route_post: {}
					}
				})
				assert.equal(r.simple_route_post.path(), '/simple_route_post.the_post')
				r = new Trocha({
					post: '.the_post',
					routes: {
						simple_route_post: {}
					}
				})
				assert.equal(r.simple_route_post.path(), '/simple_route_post')
				assert.equal(
					r.simple_route_post.path({
						post: true
					}),
					'/simple_route_post.the_post'
				)
				assert.equal(
					r.simple_route_post.path({
						ext: true
					}),
					'/simple_route_post.the_post'
				)
			})
		})
	})

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

	// include "_function_path.js"
	// include "_issues.js"
})

