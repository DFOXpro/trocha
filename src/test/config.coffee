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
		results.toTest.push {title: title, fun: describeFun}
		results.total++

	r.assert = (result, expected)->
		if data.result != data.expected
			results.running.fail = true
			console.error "Expected ", data.expected, ", but was ", data.result

	r.run = ()->
		while results.toTest.length > 0
			results.running = results.toTest.pop()
			console.log "Testing " + results.running.title
			results.running.fun()
			results.bad++ if results.running.fail
		console.log "Of " + results.total + " tests, " + results.bad + " failed, " + (results.total - results.bad) + " passed."
	r

	if options && options.global
		Object.keys(r).forEach (attr)->
			window[attr] = r[attr]

	r

test = testFramework {global: true}
