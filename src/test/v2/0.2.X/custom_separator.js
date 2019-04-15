describe('0.2.2 custom separator & firstSeparator', () => {
	var r
	describe('Default separator', () => {
		it('should set default separator', () => {
			r = new Trocha({
				// separator: Trocha.SLASH,
				routes: {
					hello: {
						Susy: {},
						myAlias: 'asd'
					},
					myResource: {
						$type: Trocha.RESOURCE,
						$id: 'miId'
					}
				}
			})
			assert.equal(r.hello.Susy.path(), '/hello/Susy')
			assert.equal(r.hello.myAlias.path(), '/hello/asd')
		})
		it('should set firstSeparator', () => {
			r = new Trocha({
				firstSeparator: false,
				routes: {
					hello: { Susy: {} },
					myAlias: {
						$type: Trocha.ALIAS,
						$alias: 'asd',
						qwe: {}
					},
					myResource: {
						$type: Trocha.RESOURCE,
						$id: 'miId'
					}
				}
			})
			assert.equal(r.hello.Susy.path(), 'hello/Susy')
			assert.equal(r.myAlias.qwe.path(), 'asd/qwe')
			assert.equal(r.myResource.show.path(), 'myResource/:miId')
			r = new Trocha({
				separator: Trocha.BACK_SLASH,
				firstSeparator: true,
				routes: { hello: { Susy: {} } }
			})
			assert.equal(r.hello.Susy.path(), '\\hello\\Susy')
		})
	})
	describe('Custom separator', () => {
		it('should set DOT separator', () => {
			r = new Trocha({
				separator: Trocha.DOT,
				routes: { hello: { Susy: {} } }
			})
			assert.equal(r.hello.Susy.path(), 'hello.Susy')
			assert.equal(Trocha.DOT, 'DOT')
		})
		it('should set BACK_SLASH separator', () => {
			r = new Trocha({
				separator: Trocha.BACK_SLASH,
				routes: { hello: { Susy: {} } }
			})
			assert.equal(r.hello.Susy.path(), 'hello\\Susy')
			assert.equal(Trocha.BACK_SLASH, 'BACK_SLASH')
		})
	})
})
