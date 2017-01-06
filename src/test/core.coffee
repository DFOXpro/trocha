(->
	describe 'Trocha Js Routes List engine', ->
		describe 'Constants', ->
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
			#it 'should return routes creation methods', ->
				#assert trocha.$ROUTE, "ROUTE"
				#assert trocha.$SCOPE, "SCOPE"
		describe 'Constructor', ->
			it 'should create a valid trocha object', ->
				assert trocha, ->
				r = trocha()
				assert r, {}
)()
