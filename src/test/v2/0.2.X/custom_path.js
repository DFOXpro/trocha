describe('0.2.2 custom path', () => {
	var r
	describe('Default path', () => {
		it('should set default path', () => {
			r = new Trocha({
				// path: Trocha.SLASH,
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
	})
	describe('Custom path', () => {
		it('should set unique function path', () => {
			r = new Trocha({
				fun: path_args => {},
				routes: { hello: { Susy: {} } }
			})
			assert.equal(r.hello.Susy.path(), 'WOW hello.Susy')
		})
		it('should set BACK_SLASH path', () => {
			r = new Trocha({
				path: Trocha.BACK_SLASH,
				routes: { hello: { Susy: {} } }
			})
			assert.equal(r.hello.Susy.path(), 'hello\\Susy')
			assert.equal(Trocha.BACK_SLASH, 'BACK_SLASH')
		})
	})
})
