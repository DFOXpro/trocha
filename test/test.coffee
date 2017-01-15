testFramework = (options)->
	results = {
		running: null
		toTest: []
		total: 0
		bad: 0
	}

	r = {}
	r.it = (doString, itFun)->
		console.log doString
		itFun()

	r.describe = (title, describeFun)->
		desc =
			title: title
			fun: describeFun
			failWarning: ()->
				this.fail = true
				results.bad++
				console.error this.title + " failed."
		desc.parent = results.running if results.running
		results.toTest.push desc
		results.total++

	r.assert = (result, expected)->
		bw = ", but was:"
		if 'object' == typeof expected
			if 'object' != typeof result
				results.running.fail = true
				console.error "Expected any object" + bw, result
		else if 'function' == typeof expected
			if 'function' != typeof result
				results.running.fail = true
				console.error "Expected any function" + bw, result
		else if result != expected
			results.running.fail = true
			console.error "Expected ", expected, bw, result

	r.run = ()->
		while results.toTest.length > 0
			results.running = results.toTest.pop()
			console.info "Testing " + results.running.title
			try
				results.running.fun()
			catch e
				results.running.fail = true
				console.error "Exception caught", e
			if results.running.fail
				results.running.failWarning()
				if results.running.parent && !results.running.parent.fail
					results.running.parent.failWarning()
		console.log "Of " + results.total + " tests, " + results.bad + " failed, " + (results.total - results.bad) + " passed."
	r

	if options && options.global
		Object.keys(r).forEach (attr)->
			window[attr] = r[attr]

	r

test = testFramework {global: true}

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
				r.simple_route._newRoute {
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
				assert r.simple_route.simple_route, {}
				assert r.simple_scope, {}
				assert r.simple_resource, {}
				assert r.simple_alias, "simple_alias"

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

test.run()


