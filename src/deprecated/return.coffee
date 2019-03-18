## Previous ROUTES ENGINE
## START RETURN
	# Request method types
	[
		# Request method types
		OPTIONS, GET, HEAD, POST, PUT, PATCH, DELETE, TRACE, CONNECT
		# Route types
		RESOURCE, ROUTE, SCOPE
	].forEach (attribute)->
		Object.defineProperty trochaReturn, attribute,
		get: -> attribute
	# Basic resource
	Object.defineProperty trochaReturn, $+RESOURCE,
		get: -> _basicResource

	trochaReturn
## END RETURN
## Next END
