// base path function
// include "_Route_path.js"

// Route classes
include "_Route2.js"
// include "_Alias.js"
// include "_Resource.js"
// include "_Scope.js"

var _Trocha
;(function() {
	/**
	 * The main Class of the trocha library
	 * @see https://dfoxpro.github.io/trochaJS/#101-intro-to-trocha-js
	 * @module Trocha
	 * @exports default, Trocha
	 * @class Trocha
	 */
	function Trocha(args) {
		return _constructor(args)
	}

	/**
	 * @constructor
	 * @memberof Trocha
	 * @see https://dfoxpro.github.io/trochaJS/#203-route-definition-parameters
	 * @param {object} [arg]
	 * @param {routeParamsDefinition} [arg.routes]
	 * @param {routeParamsDefinition} arg.routes.<children_route>
	 * @param {Trocha.ROUTE | Trocha.SCOPE | Trocha.RESOURCE | Trocha.ALIAS} [arg.routes.$type=Trocha.ROUTE]
	 * @param {Trocha.COLON | Trocha.BRACKETS} [arg.idMode = Trocha.COLON]
	 * @param {Trocha.SLASH | Trocha.BACK_SLASH | Trocha.DOT} [arg.separator = Trocha.SLASH]
	 * @param {String} arg.routes.$alias
	 * @param {String} arg.routes.$id
	 * @param {string} [arg.customSelector = '$']
	 * @param {string} [arg.domain]
	 * @param {string} [arg.pre]
	 * @param {string} [arg.post]
	 * @param {boolean} [firstSeparator = true]
	 * @param {boolean} [arg.alwaysUrl = false]
	 * @param {boolean} [arg.alwaysPost = false]
	 * @param {function | object<function>} [arg.fun]
	 */
	function _constructor(args = {}) {
		var r = Route(
			null,
			null, //Because it's the root
			args[CUSTOM_SELECTOR],
			null,
			args[ROUTES],
			args[DOMAIN],
			args[ALWAYS_URL],
			args[PREFIX],
			args[POSTFIX],
			args[ALWAYS_POST],
			//args[ALWAYSPRE],/**@TODO
			args[ID_MODE],
			args[SEPARATOR],
			args[FIRST_SEPARATOR],
			args[CUSTOM_FUNCTION]
		)
		return r
	}

	//// STATIC AVAILABLE ATTRIBUTES
	/// Offers all the route types
	/**
	 * Default route type
	 * Symbol for Route type... route
	 * @see https://dfoxpro.github.io/trochaJS/#route
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, ROUTE, ROUTE)

	/**
	 * Route type optional to tree definition
	 * Symbol for Scope type route
	 * @see https://dfoxpro.github.io/trochaJS/#scope
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, SCOPE, SCOPE)

	/**
	 * Route type that contain a CRUD like tree route definition
	 * Symbol for Resource type route
	 * @see https://dfoxpro.github.io/trochaJS/#resource
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, RESOURCE, _RESOURCE)

	/**
	 * Route type that can be used to abbreviate long name routes, like CDN
	 * Symbol for Alias type route
	 * @see https://dfoxpro.github.io/trochaJS/#alias
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, ALIAS, _ALIAS)

	/// Offers all the request types
	/**
	 * HTTP request method
	 * Used by browsers to ask CORS permissions
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, OPTIONS, OPTIONS)

	/**
	 * Most common HTTP request method
	 * It's tue default method for all routes
	 * Used in REST for Read operations
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods for all methods info
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, GET, GET)

	/**
	 * HTTP request method
	 * Same as get without body response
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, HEAD, HEAD)

	/**
	 * HTTP request method
	 * Used in REST for Create operations
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, POST, POST)

	/**
	 * HTTP request method
	 * Used in REST for Create operations
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, PUT, PUT)

	/**
	 * HTTP request method
	 * Used in REST for Update/Write operations
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, PATCH, PATCH)

	/**
	 * HTTP request method
	 * Used in REST for Destroy/Remove operations
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, DELETE, DELETE)

	/**
	 * HTTP request method
	 * Used for usage/error log client to server
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, TRACE, TRACE)

	/**
	 * HTTP request method
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, CONNECT, CONNECT)

	/// Offers ID modes
	/**
	 * Standard definition of Id; used in Angular, React(Router)
	 * Symbol for "/:the_id" id mode, default ID mode
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, COLON, COLON)

	/**
	 * Definition of Id used in CanJS and other frameworks
	 * Symbol for "/{the_id}" id mode
	 * @public
	 * @static
	 */
	_newAttribute(Trocha, BRACKETS, BRACKETS)

	/**
	 * Offers basic resource structure
	 * @See Route constructor for custom selector
	 * @name $RESOURCE
	 * @public
	 * @memberof Route
	 * @static
	 */
	_newAttribute(Trocha, DS + _RESOURCE, _basicResource())

	/**
	 * Standard definition of separator; used in Unix, http
	 * Symbol for "/" separator, default separator
	 * @name SLASH
	 * @public
	 * @memberof Route
	 * @static
	 */
	_newAttribute(Trocha, SLASH, SLASH)

	/**
	 * Used in MS Windows file system
	 * Symbol for "\" separator
	 * @name BACK_SLASH
	 * @public
	 * @memberof Route
	 * @static
	 */
	_newAttribute(Trocha, BACK_SLASH, BACK_SLASH)

	/**
	 * Used in localization libraries and other properties enviorements
	 * Symbol for "." separator
	 * @name DOT
	 * @public
	 * @memberof Route
	 * @static
	 */
	_newAttribute(Trocha, DOT, DOT)
	_Trocha = Trocha
})()
