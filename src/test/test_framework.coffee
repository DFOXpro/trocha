testFramework = (options) ->
	results =
		runningDescribe: null
		describesToTest: []
		asserts: 0
		badAsserts: 0
		totalBaseDescribes: 0
		total: 0
		bad: 0

	r = {}
	r.it = (doString, itFun) ->
		console.log doString
		try
			itFun()
		catch e
			console.error "BROKEN EXAMPLE " + doString
			console.error "Exception caught", e
		
	r.describe = (title, describeFun) ->
		successPromp = ->
			console.log "%c#{desc.title} test success.", "color: white; font-style: italic; background-color: green;padding: 1em"
		failWarning = ->
			desc.fail = true
			results.bad++
			console.log "%c#{desc.title} test failed.", "color: white; font-style: italic; background-color: red;padding: 1em"

		desc =
			title: ''
			fun: describeFun
			childsDescribes: []
			totalChilds: 0
			failWarning: failWarning
			successPromp: successPromp
		if results.runningDescribe
			desc.parent = results.runningDescribe
			desc.position = ++desc.parent.totalChilds
		else
			desc.parent = totalChilds: results.totalBaseDescribes
		results.total++

		_descNumeral = (_desc) ->
			desc.title = "#{_desc.position}.#{desc.title}" if _desc.position
			if _desc.parent
				_descNumeral _desc.parent
			else
				desc.title += " #{title}"
		_descNumeral desc

		if desc.parent.childsDescribes
			desc.parent.childsDescribes.push desc
		else
			results.describesToTest.push desc

	r.assertFunctionError = (faultyFunction, params, expectedException) ->
		try
			faultyFunction params
			results.badAsserts++
			results.runningDescribe.fail = true
			console.assert false, {expectedException: expectedException, msg: 'Expected error in function buts runs ok'}
		catch e
			# console.log 'Spected error was an error', e

	r.assert = (result, expected) ->
		assertFail = false
		results.asserts++
		errorMessage = ''
		if 'object' == typeof expected
			if 'object' != typeof result
				assertFail = true
				errorMessage = "Expected any object"
		else if 'function' == typeof expected
			if 'function' != typeof result
				assertFail = true
				errorMessage = "Expected any function"
		else if result != expected
			assertFail = true
			errorMessage = "Expected #{expected}, but was: #{result}"
		if assertFail
			results.badAsserts++
			results.runningDescribe.fail = true
			console.assert false, {expected: expected, result: result, msg: errorMessage}
		return assertFail

	r.run = ->
		_runDescribes = (describes) ->
			success = true
			while describes.length > 0
				_currentDescribe = results.runningDescribe = describes.shift()
				console.info "Testing " + results.runningDescribe.title
				try
					_currentDescribe.fun()
					success = false if !_runDescribes _currentDescribe.childsDescribes
					_currentDescribe.fail = true if !success
				catch e
					_currentDescribe.fail = true
					console.error "Exception caught", e
				if _currentDescribe.fail
					_currentDescribe.failWarning()
				else
					_currentDescribe.successPromp()
			return success
		_runDescribes results.describesToTest

		console.log(
			"Of (#{results.asserts - results.badAsserts}/#{results.asserts}) assert",
			"(#{(results.total - results.bad)}/#{results.total}) tests, #{results.bad} failed"
		)

	if options && options.global
		Object.keys(r).forEach (attr) ->
			window[attr] = r[attr]

	r

test = testFramework global: true

# Note this function does not clone functions
_clone = (object) ->
	JSON.parse JSON.stringify object