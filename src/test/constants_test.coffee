constants_test = ->
	describe 'Constants returns', ->
		it 'should be no editable', ->
			trocha.ROUTE = "Atack!"
			trocha.OPTIONS = "Atack!"
			trocha.$RESOURCE = "Atack!"
			assert trocha.ROUTE, "ROUTE"
			assert trocha.OPTIONS, "OPTIONS"
			assert trocha.$RESOURCE, {}
		it 'should return HTTP request methods types', ->
			assert trocha.OPTIONS, "OPTIONS"
			assert trocha.GET, "GET"
			assert trocha.HEAD, "HEAD"
			assert trocha.POST, "POST"
			assert trocha.PUT, "PUT"
			assert trocha.PATCH, "PATCH"
			assert trocha.DELETE, "DELETE"
			assert trocha.TRACE, "TRACE"
			assert trocha.CONNECT, "CONNECT"
		it 'should return default resource tree', ->
			assert trocha.$RESOURCE, {
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
			assert trocha.ALIAS, "ALIAS"
			assert trocha.SCOPE, "SCOPE"
			assert trocha.ROUTE, "ROUTE"
			assert trocha.RESOURCE, "RESOURCE"

	constants_test = undefined
