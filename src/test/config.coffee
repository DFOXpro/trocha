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
		if data.result != data.expected
			results.running.fail = true
			console.error "Expected ", data.expected, ", but was ", data.result

	r.run = ()->
		while results.toTest.length > 0
			results.running = results.toTest.pop()
			console.log "Testing " + results.running.title
			results.running.fun()
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
