##START VARIABLES
	#Utility vars
	_ = '/'
	s = '' # Force string
	$ = '$'

	#Request method types
	OPTIONS = 'OPTIONS'
	GET = 'GET'
	HEAD = 'HEAD'
	POST = 'POST'
	PUT = 'PUT'
	PATCH = 'PATCH'
	DELETE = 'DELETE'
	TRACE = 'TRACE'
	CONNECT = 'CONNECT'

	#Route types
	ROUTE = 'ROUTE'
	SCOPE = 'SCOPE'
	RESOURCE = 'RESOURCE'

	# Input attributes
	ID = 'id'
	NAME = 'name'
	HIDE = 'hide'
	URL = 'url'
	TYPE = 'type'
	PREFIX = 'pre'
	ALIAS = 'alias'
	POSTFIX = 'post'
	EXTENDED = 'ext'
	METHOD = 'method'
	DOMAIN = 'domain'
	ROUTES = 'routes'
	JUST_ID = 'justId' #FAILS
	AFTER_ID = 'afterId' #FAILS
	PARENT_ID = 'parentId'
	ALWAYS_URL = 'alwaysUrl'
	CUSTOM_SELECTOR = 'customSelector'

	#Route return attributes
	AS = $+'as'
	$ID = $+ID
	PATH = 'path'
	$NAME = $+NAME
	$METHOD = $+METHOD
	CUSTOM = '_custom'
	NEW_SCOPE = '_newScope'
	NEW_ROUTE = '_newRoute'
	NEW_RESOURCE = '_newResource'

	#Main object return attributes
	$domain = $+DOMAIN
	$prefix = $+PREFIX
	$postfix = $+POSTFIX
	$alwaysUrl = $+ALWAYS_URL
	$resource = $+RESOURCE.toLowerCase()
	$customSelector =$+CUSTOM_SELECTOR

	##private

	#BASIC RESOURCE
	_show = 'show'
	_edit = 'edit'
	_new = 'new'
	_list = 'list'
	_basicResource = {}
	_basicResource[$+ID] = ID
	_basicResource[_show] = {}
	_basicResource[_edit] = {}
	_basicResource[_new] = {}
	_basicResource[_list] = {}
	_basicResource[_show][$+HIDE] = true
	_basicResource[_new][$+ID] = false
	_basicResource[_list][$+ID] = false
	_basicResource[_list][$+HIDE] = true
##END VARIABLES