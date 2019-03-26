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
				$hide: true
			},
			edit: {},
			new: {
				$id: false
			},
			list: {
				$hide: true,
				$id: false
			}
		})
	})
	it('should return routes types', () => {
		assert.equal(Trocha.ALIAS, 'ALIAS')
		assert.equal(Trocha.SCOPE, 'SCOPE')
		assert.equal(Trocha.ROUTE, 'ROUTE')
		assert.equal(Trocha.RESOURCE, 'RESOURCE')
	})
})
