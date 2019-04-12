describe('Base variables returns', () => {
	it('should set customSelector', () => {
		var r
		r = new Trocha()
		assert.isObject(r.$RESOURCE)
		assert.equal(r.$domain, '')
		r = new Trocha({
			customSelector: '$$'
		})
		assert.isObject(r.$$RESOURCE)
		assert.equal(r.$$domain, '')
	})
	it('should set domain', () => {
		var r
		r = new Trocha()
		assert.equal(r.$domain, '')
		r = new Trocha({
			domain: 'asd'
		})
		assert.equal(r.$domain, 'asd')
	})
})
