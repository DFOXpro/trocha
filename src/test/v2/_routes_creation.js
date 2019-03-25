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
