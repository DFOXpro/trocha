// Utility vars
let _ = '/'
let s = '' // Force string
let $ = '$'

// Request method types
let OPTIONS = 'OPTIONS'
let GET = 'GET'
let HEAD = 'HEAD'
let POST = 'POST'
let PUT = 'PUT'
let PATCH = 'PATCH'
let DELETE = 'DELETE'
let TRACE = 'TRACE'
let CONNECT = 'CONNECT'

// Route types
let ROUTE = 'ROUTE'
let SCOPE = 'SCOPE'
let RESOURCE = 'RESOURCE'
let _ALIAS = 'ALIAS'

// Input attributes
let ID = 'id'
let NAME = 'name'
let HIDE = 'hide'
let URL = 'url'
let TYPE = 'type'
let PREFIX = 'pre'
let ALIAS = 'alias'
let POSTFIX = 'post'
let EXTENDED = 'ext'
let METHOD = 'method'
let DOMAIN = 'domain'
let ROUTES = 'routes'
let JUST_ID = 'justId'
let AFTER_ID = 'afterId' // FAILS & no DOCS
let PARENT_ID = 'parentId'
let ALWAYS_URL = 'alwaysUrl'
let ALWAYS_POST = 'alwaysPost'
let CUSTOM_SELECTOR = 'customSelector'

// Route return attributes
let AS = $+'as'
let $ID = $+ID
let PATH = 'path'
let $NAME = $+NAME
let $METHOD = $+METHOD
let CUSTOM = '_custom'
let NEW_SCOPE = '_newScope'
let NEW_ROUTE = '_newRoute'
let NEW_RESOURCE = '_newResource'
let NEW_ALIAS = '_newAlias'

// Main object return attributes
let $domain = $+DOMAIN
let $prefix = $+PREFIX
let $postfix = $+POSTFIX
let $alwaysUrl = $+ALWAYS_URL
let $alwaysPost = $+ALWAYS_POST
let $resource = $+RESOURCE.toLowerCase()
let $customSelector = $+CUSTOM_SELECTOR

//// private

// BASIC RESOURCE
let _show = 'show'
let _edit = 'edit'
let _new = 'new'
let _list = 'list'
let _basicResource = {}
_basicResource[$+ID] = ID
_basicResource[_show] = {}
_basicResource[_edit] = {}
_basicResource[_new] = {}
_basicResource[_list] = {}
_basicResource[_show][$+HIDE] = true
_basicResource[_new][$+ID] = false
_basicResource[_list][$+ID] = false
_basicResource[_list][$+HIDE] = true
