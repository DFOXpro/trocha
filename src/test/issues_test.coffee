issues_test = ->
	describe 'Solve issues', ->
		it '4', ->
			myRoutes = new Trocha
				customSelector: 'TRCH'
				routes:
					hello:
						TRCHid: 'name'
						TRCHmethod: Trocha.GET
						$id: {}
			assert myRoutes.hello.path(name: 'World'), '/hello/World'
			assert myRoutes.hello.TRCHid, 'name'
			assert myRoutes.hello.$id, {}
			assert myRoutes.hello.TRCHmethod, 'GET'
			assert myRoutes.hello.$id.path(), '/hello/:name/$id'
	issues_test = undefined