testFramework = (options)->
	results = {
		running: null
		toTest: []
		asserts: 0
		badAsserts: 0
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
				console.error "#{this.title} test failed."
		desc.parent = results.running if results.running
		results.toTest.push desc
		results.total++

	r.assert = (result, expected)->
		assertFail = false
		results.asserts++
		bw = ", but was:"
		if 'object' == typeof expected
			if 'object' != typeof result
				assertFail = true
				console.error "Expected any object" + bw, result
		else if 'function' == typeof expected
			if 'function' != typeof result
				assertFail = true
				console.error "Expected any function" + bw, result
		else if result != expected
			assertFail = true
			console.error "Expected ", expected, bw, result
		if assertFail
			results.badAsserts++
			results.running.fail = true

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
		console.log(
			"Of (#{results.asserts - results.badAsserts}/#{results.asserts}) assert",
			"(#{(results.total - results.bad)}/#{results.total}) tests, #{results.bad} failed"
		)
	r

	if options && options.global
		Object.keys(r).forEach (attr)->
			window[attr] = r[attr]

	r

test = testFramework {global: true}
