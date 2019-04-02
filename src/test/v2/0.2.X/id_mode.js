describe('0.2.1 idMode', () => {
	var r
	describe('Default IdMode', () => {
		before(
			() =>
				(r = new Trocha({
					routes: {
						withId: {
							$id: 'myId',
							child: {}
						}
					}
				}))
		)
		it('should set default IdMode', () => {
			assert.equal(r.withId.path(), '/withId/:myId')
			assert.equal(r.withId.child.path(), '/withId/:myId/child')
		})
		it('should override parent id', () => {
			assert.equal(r.withId.child.path({ parentId: false }), '/withId/child')
			assert.equal(r.withId.child.path({ myId: false }), '/withId/child')
		})
	})
	describe('Custom IdMode', () => {
		before(
			() =>
				(r = new Trocha({
					idMode: Trocha.BRACKETS,
					routes: {
						withId: {
							$id: 'myId',
							child: {}
						},
						anscope: {
							$type: Trocha.SCOPE,
							$id: 'asId',
							aresource: {
								$type: Trocha.RESOURCE,
								$id: 'arId'
							},
							analias: {
								$type: Trocha.ALIAS,
								$alias: 'theAlias',
								$id: 'aaId',
								otheralias: 'theOtherAlias'
							}
						}
					}
				}))
		)
		it('should set BRACKETS IdMode', () => {
			assert.equal(r.withId.path(), '/withId/{myId}')
			assert.equal(r.withId.child.path(), '/withId/{myId}/child')
		})
		it('should override parent id', () => {
			assert.equal(r.withId.child.path({ parentId: false }), '/withId/child')
			assert.equal(r.withId.child.path({ myId: false }), '/withId/child')
		})
		it('should works with scope', () => {
			assert.equal(r.anscope.aresource.list.path(), '/{asId}/aresource')
			assert.equal(
				r.anscope.aresource.new.path({ asId: false }),
				'/aresource/new'
			)
		})
		it('should works with resource', () => {
			assert.equal(r.aresource.show.path(), '/aresource/{arId}')
			assert.equal(r.aresource.show.path({ arId: false }), '/aresource')
			assert.equal(r.aresource.new.path(), '/aresource/new')
		})
		it('should works with alias', () => {
			// alias has extra test 'cause it declares the id aside of default path
			assert.equal(r.analias.path(), 'theAlias/{aaId}')
			assert.equal(r.analias.path({ aaId: false }), 'theAlias')
			assert.equal(r.analias.path({ aaId: 'asd' }), 'theAlias/asd')
			assert.equal(r.anscope.analias.path(), '/{asId}/theAlias/{aaId}')
			assert.equal(
				r.anscope.analias.path({ asId: 'asd' }),
				'/asd/theAlias/{aaId}'
			)
			assert.equal(r.analias.otheralias.path(), 'theAlias/{aaId}/theOtherAlias')
			assert.equal(
				r.analias.otheralias.path({ aaId: false }),
				'theAlias/theOtherAlias'
			)
		})

		r = new Trocha({
			idMode: Trocha.COLON,
			routes: {
				withId: { $id: 'myId' }
			}
		})
		assert.equal(r.withId.path(), '/withId/:myId')
	})
})
