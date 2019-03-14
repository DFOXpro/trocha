constants_test = ->
	describe 'Constants returns', ->
		it 'should be no editable', ->
			Trocha.ROUTE = "Atack!Route"
			Trocha.OPTIONS = "Atack!Option"
			Trocha.$RESOURCE = "Atack!$Resource"
			assert Trocha.ROUTE, "ROUTE"
			assert Trocha.OPTIONS, "OPTIONS"
			assert Trocha.$RESOURCE, {}
		it 'should return HTTP request methods types', ->
			assert Trocha.OPTIONS, "OPTIONS"
			assert Trocha.GET, "GET"
			assert Trocha.HEAD, "HEAD"
			assert Trocha.POST, "POST"
			assert Trocha.PUT, "PUT"
			assert Trocha.PATCH, "PATCH"
			assert Trocha.DELETE, "DELETE"
			assert Trocha.TRACE, "TRACE"
			assert Trocha.CONNECT, "CONNECT"
		it 'should return default resource tree', ->
			assert Trocha.$RESOURCE, {
				$id: 'id'
				show:
					$hide: true
				edit: {}
				new:
					$id: false
				list:
					$hide: true
					$id: false
			}
		it 'should return routes types', ->
			assert Trocha.ALIAS, "ALIAS"
			assert Trocha.SCOPE, "SCOPE"
			assert Trocha.ROUTE, "ROUTE"
			assert Trocha.RESOURCE, "RESOURCE"

	constants_test = undefined
