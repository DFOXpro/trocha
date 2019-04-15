// Route classes
include "_Route.js"
include "_Alias.js"
include "_Resource.js"
include "_Scope.js"

class Trocha extends Route {
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
			args[FIRST_SEPARATOR]
		)
	}

	/*
	 * STATIC AVAILABLE ATTRIBUTES
	 */
	/*
	 * Offers all the route types
	 */
	static get ROUTE() {
		return ROUTE
	}
	static get SCOPE() {
		return SCOPE
	}
	static get RESOURCE() {
		return _RESOURCE
	}
	static get ALIAS() {
		return _ALIAS
	}

	/*
	 * Offers all the request types
	 */
	static get OPTIONS() {
		return OPTIONS
	}
	static get GET() {
		return GET
	}
	static get HEAD() {
		return HEAD
	}
	static get POST() {
		return POST
	}
	static get PUT() {
		return PUT
	}
	static get PATCH() {
		return PATCH
	}
	static get DELETE() {
		return DELETE
	}
	static get TRACE() {
		return TRACE
	}
	static get CONNECT() {
		return CONNECT
	}

	/*
	 * Offers ID modes
	 */
	static get BRACKETS() {
		return BRACKETS
	}
	static get COLON() {
		return COLON
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
