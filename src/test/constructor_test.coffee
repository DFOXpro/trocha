constructor_test = ->
	describe 'Constructor', ->
		it 'should create a valid trocha object', ->
			assert trocha, ->
			r = trocha()
			assert r, {}
			assert r._custom, ->
			assert r._newResource, ->
			assert r._newRoute, ->
			assert r._newScope, ->

	constructor_test = undefined
