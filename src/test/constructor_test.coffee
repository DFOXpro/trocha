constructor_test = ->
	describe 'Constructor', ->
		it 'should check trocha is a class object', ->
			# https://stackoverflow.com/questions/1249531/how-to-get-a-javascript-objects-class
			assert Trocha, ->
			r = new Trocha()
			assert Trocha.name, "Trocha"
		it 'should create a valid trocha object', ->
			r = new Trocha()
			assert r, {}
			assert r._custom, ->
			assert r._newResource, ->
			assert r._newRoute, ->
			assert r._newScope, ->

	constructor_test = undefined
