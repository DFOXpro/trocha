(->
	describe 'Trocha JS Routes List engine', ->
		describe 'Route creation', ->
			it 'should create routes via JSON Constructor', ->
				r = trocha {
					routes:
						simple_route :{}
						simple_scope: {$type: trocha.SCOPE}
						simple_alias: "simple_alias"
						simple_resource:
							$type: trocha.RESOURCE
							$id: "simple_id" #resource must have ID
				}
				assert r.simple_route, {}
				assert r.simple_scope, {}
				assert r.simple_resource, {}
				#assert r.simple_alias, {} #will fail
				assert r.simple_alias, "simple_alias" # @TODO remove me after alias fix
			it 'should create routes via post init functions', ->
				r = trocha()
				r._newRoute {
					name: "simple_route"
				}
				r._newScope {
					name: "simple_scope"
				}
				r._newResource {
					name: "simple_resource"
					id: "simple_id"
				}
				r._newAlias {
					name: "simple_alias"
					alias: "simple_alias"
				}
				assert r.simple_route, {}
				assert r.simple_scope, {}
				assert r.simple_resource, {}
				assert r.simple_alias, "simple_alias"
				console.log r

		describe 'Constants returns', ->
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
				assert trocha.ROUTE, "ROUTE"
				assert trocha.SCOPE, "SCOPE"
				assert trocha.RESOURCE, "RESOURCE"
		describe 'Constructor', ->
			it 'should create a valid trocha object', ->
				assert trocha, ->
				r = trocha()
				assert r, {}
				assert r._custom, ->
				assert r._newResource, ->
				assert r._newRoute, ->
				assert r._newScope, ->
)()
