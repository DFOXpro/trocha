describe('Solve issues', () => {
	it('1: alias routes must provide a path funtion', () => {
		var myRoutes
		myRoutes = new Trocha({
			routes: {
				hello: {
					$type: Trocha.ALIAS,
					$alias: 'hi',
					name: {
						$justId: true,
						$id: 'my_name'
					},
					myCountry: {
						$type: Trocha.ALIAS,
						$alias: 'Colombia',
						$id: 'department'
					}
				}
			}
		})
		assert.equal(myRoutes.hello.path(), 'hi')
		assert.equal(myRoutes.hello.name.path(), 'hi/:my_name')
		assert.equal(
			myRoutes.hello.name.path({
				my_name: 'underworld'
			}),
			'hi/underworld'
		)
		assert.equal(myRoutes.hello.myCountry.path(), 'hi/Colombia/:department')
		assert.equal(
			myRoutes.hello.myCountry.path({
				department: 'Santander'
			}),
			'hi/Colombia/Santander'
		)
	})
	it('4: customSelector must works with routes attributes', () => {
		var myRoutes
		myRoutes = new Trocha({
			customSelector: 'TRCH',
			routes: {
				hello: {
					TRCHid: 'name',
					TRCHmethod: Trocha.GET,
					$id: {}
				}
			}
		})
		assert.equal(
			myRoutes.hello.path({
				name: 'World'
			}),
			'/hello/World'
		)
		assert.equal(myRoutes.hello.TRCHid, 'name')
		assert.isObject(myRoutes.hello.$id)
		assert.equal(myRoutes.hello.TRCHmethod, 'GET')
		assert.equal(myRoutes.hello.$id.path(), '/hello/:name/$id')
	})
})
