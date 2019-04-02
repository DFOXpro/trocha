/*
 * Why variables are outside the Trocha class?
 * Because private variables are still not supported
 * and because Route share a lot of symbols with Trocha
 */

// Utility vars
const _ = '/'
const s = '' // Force string
const DS = '$' // DEFAULT_SELECTOR

// Request method types
const OPTIONS = 'OPTIONS'
const GET = 'GET'
const HEAD = 'HEAD'
const POST = 'POST'
const PUT = 'PUT'
const PATCH = 'PATCH'
const DELETE = 'DELETE'
const TRACE = 'TRACE'
const CONNECT = 'CONNECT'

// Route types
const ROUTE = 'ROUTE'
const SCOPE = 'SCOPE'
const _RESOURCE = 'RESOURCE'
const _ALIAS = 'ALIAS'

/// ID modes
/**
 * Standard definition of Id; used in Angular, React(Router)
 * Symbol for "/:the_id" id mode, default ID mode
 * @Public via Trocha
 */
const COLON = 'COLON'
/**
 * Definition of Id used in CanJS and other frameworks
 * Symbol for "/{the_id}" id mode
 * @Public via Trocha
 */
const BRACKETS = 'BRACKETS'

// Next const are private helpers for ID modes
const _ID_MODE_REPLACE = 'Ñ' // Can be any rare character
const _PREID = _ + _ID_MODE_REPLACE
const _AVAILABLE_ID_MODES = {} // In teory only used in _FORMAT_ID_FUN
_AVAILABLE_ID_MODES[BRACKETS] = `{${_ID_MODE_REPLACE}}`
_AVAILABLE_ID_MODES[COLON] = `:${_ID_MODE_REPLACE}`

/**
 * Interpolator of id mode to be used in path function
 * @todo should be Route protected(private & inheritable) method
 * @param {string} currentIdMode - can be BRACKETS | COLON
 * @second_order
 * @pure
 * @return {function} see function below
 */
const _FORMAT_ID_FUN = currentIdMode =>
	/**
	 * Interpolate template with _AVAILABLE_ID_MODES[currentIdMode] and idName
	 * @param {string} idName
	 * @param {template literal | string} template - should contain _ID_MODE_REPLACE value; default _ID_MODE_REPLACE
	 * @lambda
	 * @pure false - depends on currentIdMode, _AVAILABLE_ID_MODES and _ID_MODE_REPLACE
	 * @example λ('zxc',`asd${_ID_MODE_REPLACE}qwe`) will return 'asd:zxcqwe' or 'asd{zxc}qwe'
	 * @return {string}
	 */
	(idName, template = _ID_MODE_REPLACE) =>
		template.replace(
			_ID_MODE_REPLACE,
			_AVAILABLE_ID_MODES[currentIdMode].replace(_ID_MODE_REPLACE, idName)
		)

/// Input attributes
const ID = 'id'
const URL = 'url'
const NAME = 'name'
const HIDE = 'hide'
const TYPE = 'type'
const PREFIX = 'pre'
const ALIAS = 'alias'
const QUERY = 'query'
const POSTFIX = 'post'
const EXTENDED = 'ext'
const METHOD = 'method'
const DOMAIN = 'domain'
const ROUTES = 'routes'
const ID_MODE = 'idMode'
const JUST_ID = 'justId'
// const AFTER_ID = 'afterId' // FAILS & no DOCS
const FRAGMENT = 'fragment'
const RESOURCE = 'resource'
const PARENT_ID = 'parentId'
const DEFAULT_ID = `defaultId`
const ALWAYS_URL = 'alwaysUrl'
const ALWAYS_POST = 'alwaysPost'
const CUSTOM_SELECTOR = 'customSelector'

// Route return attributes
const AS = 'as'
const PATH = 'path'
// const NEW_SCOPE = '_newScope'
// const NEW_ROUTE = '_newRoute'
// const NEW_RESOURCE = '_newResource'
// const NEW_ALIAS = '_newAlias'

// Main object return attributes
/**
 * @TODO deprecate
 * Reason: all those attributes can have customSelector
 */
// const $prefix = DS+PREFIX
// const $postfix = DS+POSTFIX
// const $alwaysUrl = DS+ALWAYS_URL
// const $alwaysPost = DS+ALWAYS_POST
// const $customSelector = DS+CUSTOM_SELECTOR

//// static final

// BASIC RESOURCE
const _show = 'show'
const _edit = 'edit'
const _new = 'new'
const _list = 'list'
const _basicResource = (SS = DS) => {
	// selectedSelector
	const r = {}
	r[SS + ID] = ID
	r[_show] = {}
	r[_edit] = {}
	r[_new] = {}
	r[_list] = {}
	r[_show][SS + HIDE] = true
	r[_new][SS + ID] = false
	r[_list][SS + ID] = false
	r[_list][SS + HIDE] = true
	return r
}

const ERROR_HEADER = 'TrochaJS error: '
const WARNING_HEADER = 'TrochaJS warning: '
const ERROR_ROUTE_ALREADY_DEFINE = 'Route already declare'
const ERROR_SCOPE_AS_A_ROUTE = 'Scope is not printable a route'
const WARNING_RESOURCE_AS_A_ROUTE = 'Resource should not be used as a route'
const WARNING_ROUTE_ATTRIBUTE_NOT_SUPPORTED = 'Attribute not supported, skiped'
