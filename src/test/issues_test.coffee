issues_test = ->
	describe 'Solve issues', ->
		it '1: alias routes must provide a path funtion', ->
			myRoutes = new Trocha
				routes:
					hello:
						$type: Trocha.ALIAS
						$alias: 'hi'
						name:
							$justId: true
							$id: 'my_name'
						myCountry:
							$type: Trocha.ALIAS
							$alias: 'Colombia'
							$id: 'department'
			assert myRoutes.hello.path(), 'hi' # note root alias dnt print the initial/
			assert myRoutes.hello.name.path(), 'hi/:my_name'
			assert myRoutes.hello.name.path({my_name: 'underworld'}), 'hi/underworld'
			assert myRoutes.hello.myCountry.path(), 'hi/Colombia/:department'
			assert myRoutes.hello.myCountry.path({department: 'Santander'}), 'hi/Colombia/Santander'

		it '4: customSelector must works with routes attributes', ->
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