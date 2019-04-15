/*
 * Why variables are outside the Trocha class?
 * Because protected attributes are still not supported
 * and because Route share a lot of symbols with Trocha
 */

/// Utility vars
const s = '' // Force string
const DS = '$' // DEFAULT_SELECTOR

/// Request method types
// @see _Trocha.js /// Offers all the request types
const GET = 'GET'
const POST = 'POST'
const PUT = 'PUT'
const PATCH = 'PATCH'
const DELETE = 'DELETE'
const OPTIONS = 'OPTIONS'
const HEAD = 'HEAD'
const TRACE = 'TRACE'
const CONNECT = 'CONNECT'

/// Route types
// @see _Trocha.js
const ROUTE = 'ROUTE'
const SCOPE = 'SCOPE'
const _RESOURCE = 'RESOURCE'
const _ALIAS = 'ALIAS'

/// custom separator
// @see _Trocha.js
const SLASH = 'SLASH'
const BACK_SLASH = 'BACK_SLASH'
const DOT = 'DOT'

// Next const are private helpers for ID modes
const _PREID = '_PREID'
const _AVAILABLE_SEPARATORS = {}
_AVAILABLE_SEPARATORS[SLASH] = {}
_AVAILABLE_SEPARATORS[SLASH][SEPARATOR] = '/'
_AVAILABLE_SEPARATORS[SLASH][FIRST_SEPARATOR] = true
_AVAILABLE_SEPARATORS[BACK_SLASH] = {}
_AVAILABLE_SEPARATORS[BACK_SLASH][SEPARATOR] = '\\'
_AVAILABLE_SEPARATORS[BACK_SLASH][FIRST_SEPARATOR] = false
_AVAILABLE_SEPARATORS[DOT] = {}
_AVAILABLE_SEPARATORS[DOT][SEPARATOR] = '.'
_AVAILABLE_SEPARATORS[DOT][FIRST_SEPARATOR] = false
_AVAILABLE_SEPARATORS[undefined] = {}

/// ID modes
// @see _Trocha.js
const COLON = 'COLON'
const BRACKETS = 'BRACKETS'

// Next const are private helpers for ID modes
const _ID_MODE_REPLACE = 'Ñ' // Can be any rare character
const _AVAILABLE_ID_MODES = {} // In teory only used in _FORMAT_ID_FUN
_AVAILABLE_ID_MODES[BRACKETS] = `{${_ID_MODE_REPLACE}}`
_AVAILABLE_ID_MODES[COLON] = `:${_ID_MODE_REPLACE}`

/**
 * Interpolator of id mode to be used in path function
 * @todo should be Route protected(private & inheritable) method
 * @param {string} currentIdMode - can be BRACKETS | COLON
 * @second_order
 * @pure
 * @private
 * @return {function} see function below
 */
const _FORMAT_ID_FUN = currentIdMode =>
	/**
	 * Interpolate template with _AVAILABLE_ID_MODES[currentIdMode] and idName
	 * @param {string} idName
	 * @param {template_literal | string} template - should contain _ID_MODE_REPLACE value; default _ID_MODE_REPLACE
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
const SEPARATOR = 'separator'
const DEFAULT_ID = 'defaultId'
const ALWAYS_URL = 'alwaysUrl'
const ALWAYS_POST = 'alwaysPost'
const FIRST_SEPARATOR = 'firstSeparator'
const CUSTOM_SELECTOR = 'customSelector'

/// Route return attributes
const AS = 'as'
const PATH = 'path'

/// Not used right now
// const NEW_SCOPE = '_newScope'
// const NEW_ROUTE = '_newRoute'
// const NEW_RESOURCE = '_newResource'
// const NEW_ALIAS = '_newAlias'

/// BASIC RESOURCE
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

/// Warnings and erros
const ERROR_HEADER = 'TrochaJS error: '
const WARNING_HEADER = 'TrochaJS warning: '
const ERROR_ROUTE_ALREADY_DEFINE = 'Route already declare'
const ERROR_SCOPE_AS_A_ROUTE = 'Scope is not printable a route'
const WARNING_RESOURCE_AS_A_ROUTE = 'Resource should not be used as a route'
const WARNING_ROUTE_ATTRIBUTE_NOT_SUPPORTED = 'Attribute not supported, skiped'
