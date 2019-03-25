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
