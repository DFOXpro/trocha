(->
	include "test_framework.coffee"
	include "constants_test.coffee"
	include "constructor_test.coffee"
	include "base_variables_test.coffee"
	include "routes_creation_test.coffee"
	include "route_types_test.coffee"
	include "function_path_test.coffee"
	include "issues_test.coffee"
	
	
	describe 'Trocha JS Routes List engine', ->
		constants_test()
		constructor_test()
		base_variables()
		routes_creation_test()
		route_types_test()
		function_path_test()
		issues_test()
	test.run()
)()
