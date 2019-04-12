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
	it('should create a valid trocha object', () => {
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
