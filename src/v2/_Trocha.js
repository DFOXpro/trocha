// base path function
include "_Route_path.js"

// Route classes
include "_Route.js"
include "_Alias.js"
include "_Resource.js"
include "_Scope.js"

/**
 * The main Class of the trocha library
 * @see https://dfoxpro.github.io/trochaJS/#101-intro-to-trocha-js
 * @module Trocha
 * @exports default, Trocha
 * @class
 */
class Trocha extends Route {
	/**
	 * @constr0uctor
	 * @see https://dfoxpro.github.io/trochaJS/#203-route-definition-parameters
	 * @param {object} [arg]
	 * @param {routeParamsDefinition} [arg.routes]
	 * @param {routeParamsDefinition} arg.routes.<children_route>
	 * @param {Trocha.ROUTE | Trocha.SCOPE | Trocha.RESOURCE | Trocha.ALIAS} [arg.routes.$type=Trocha.ROUTE]
	 * @param {Trocha.COLON | Trocha.BRACKETS} [arg.idMode=Trocha.COLON]
	 * @param {Trocha.SLASH | Trocha.BACK_SLASH | Trocha.DOT} [arg.separator=Trocha.SLASH]
	 * @param {String} arg.routes.$alias
	 * @param {String} arg.routes.$id
	 * @param {string} [arg.customSelector=$]
	 * @param {string} [arg.domain]
	 * @param {string} [arg.pre]
	 * @param {string} [arg.post]
	 * @param {boolean} [firstSeparator=true]
	 * @param {boolean} [arg.alwaysUrl=false]
	 * @param {boolean} [arg.alwaysPost=false]
	 * @param {function | object<function>} [arg.fun]
	 */
	constructor(args = {}) {
		super(
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
			args[CUSTOM_FUNCTION],
		)
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
	static get ROUTE() {
		return ROUTE
	}
	/**
	 * Route type optional to tree definition
	 * Symbol for Scope type route
	 * @see https://dfoxpro.github.io/trochaJS/#scope
	 * @public
	 * @static
	 */
	static get SCOPE() {
		return SCOPE
	}
	/**
	 * Route type that contain a CRUD like tree route definition
	 * Symbol for Resource type route
	 * @see https://dfoxpro.github.io/trochaJS/#resource
	 * @public
	 * @static
	 */
	static get RESOURCE() {
		return _RESOURCE
	}
	/**
	 * Route type that can be used to abbreviate long name routes, like CDN
	 * Symbol for Alias type route
	 * @see https://dfoxpro.github.io/trochaJS/#alias
	 * @public
	 * @static
	 */
	static get ALIAS() {
		return _ALIAS
	}

	/// Offers all the request types
	/**
	 * HTTP request method
	 * Used by browsers to ask CORS permissions
	 * @public
	 * @static
	 */
	static get OPTIONS() {
		return OPTIONS
	}
	/**
	 * Most common HTTP request method
	 * It's tue default method for all routes
	 * Used in REST for Read operations
	 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods for all methods info
	 * @public
	 * @static
	 */
	static get GET() {
		return GET
	}
	/**
	 * HTTP request method
	 * Same as get without body response
	 * @public
	 * @static
	 */
	static get HEAD() {
		return HEAD
	}
	/**
	 * HTTP request method
	 * Used in REST for Create operations
	 * @public
	 * @static
	 */
	static get POST() {
		return POST
	}
	/**
	 * HTTP request method
	 * Used in REST for Create operations
	 * @public
	 * @static
	 */
	static get PUT() {
		return PUT
	}
	/**
	 * HTTP request method
	 * Used in REST for Update/Write operations
	 * @public
	 * @static
	 */
	static get PATCH() {
		return PATCH
	}
	/**
	 * HTTP request method
	 * Used in REST for Destroy/Remove operations
	 * @public
	 * @static
	 */
	static get DELETE() {
		return DELETE
	}
	/**
	 * HTTP request method
	 * Used for usage/error log client to server
	 * @public
	 * @static
	 */
	static get TRACE() {
		return TRACE
	}
	/**
	 * HTTP request method
	 * @public
	 * @static
	 */
	static get CONNECT() {
		return CONNECT
	}

	/// Offers ID modes
	/**
	 * Standard definition of Id; used in Angular, React(Router)
	 * Symbol for "/:the_id" id mode, default ID mode
	 * @public
	 * @static
	 */
	static get COLON() {
		return COLON
	}
	/**
	 * Definition of Id used in CanJS and other frameworks
	 * Symbol for "/{the_id}" id mode
	 * @public
	 * @static
	 */
	static get BRACKETS() {
		return BRACKETS
	}

	/*
	 * Offers basic resource structure
	 * @See Route constructor for custom selector
	 */
	static get $RESOURCE() {
		return _basicResource()
	}

	/**
	 * Standard definition of separator; used in Unix, http
	 * Symbol for "/" separator, default separator
	 * @public
	 * @static
	 */
	static get SLASH() {
		return SLASH
	}
	/**
	 * Used in MS Windows file system
	 * Symbol for "\" separator
	 * @public
	 * @static
	 */
	static get BACK_SLASH() {
		return BACK_SLASH
	}
	/**
	 * Used in localization libraries and other properties enviorements
	 * Symbol for "." separator
	 * @public
	 * @static
	 */
	static get DOT() {
		return DOT
	}
}
