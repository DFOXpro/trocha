base_variables = ->
	describe 'Base variables returns', ->
		it 'should set customSelector', ->
			r = new Trocha()
			assert r.$RESOURCE, {}
			assert r.$domain, ""
			r = new Trocha({customSelector: '$$'})
			assert r.$$RESOURCE, {}
			assert r.$$domain, ""
		it 'should set domain', ->
			r = new Trocha()
			assert r.$domain, ""
			r = new Trocha({domain: 'asd'})
			assert r.$domain, "asd"
	base_variables = undefined
