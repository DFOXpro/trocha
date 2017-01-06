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
		desc.parent = results.running if results.running
		results.toTest.push desc
		results.total++

	r.assert = (result, expected)->
		if 'object' == typeof result
			if 'object' != typeof expected
				results.running.fail = true
				console.error "Expected any object, but was ", result
		else if 'function' == typeof expected
			if 'function' != typeof result
				results.running.fail = true
				console.error "Expected any function, but was ", result
		else if result != expected
			results.running.fail = true
			console.error "Expected ", expected, ", but was ", result

	r.run = ()->
		while results.toTest.length > 0
			results.running = results.toTest.pop()
			console.log "Testing " + results.running.title
			try
				results.running.fun()
			catch e
				results.running.fail = true
				console.error "Failed with ", e
			if results.running.fail
				results.bad++
				if results.running.parent && !results.running.parent.fail
					results.running.parent.fail = true
					results.bad++
		console.log "Of " + results.total + " tests, " + results.bad + " failed, " + (results.total - results.bad) + " passed."
	r

	if options && options.global
		Object.keys(r).forEach (attr)->
			window[attr] = r[attr]

	r

test = testFramework {global: true}

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

test.run()


