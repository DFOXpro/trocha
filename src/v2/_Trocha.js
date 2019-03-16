// Route classes
include "_Route.js"
include "_Alias.js"
include "_Resource.js"

class Trocha extends Route{
	constructor(args = {}) {
		super(
			null, null, //Because it's the root
			args.customSelector,
			null,
			args.routes,
			args.domain,
			args.alwaysUrl,
			args.pre,
			args.post,
			args.alwaysPost,
			//args.alwaysPre,/**@TODO
		)
	}

	/*
	 * STATIC AVAILABLE ATTRIBUTES
	 */
	 /*
	 * Offers all the route types
	 */
	static get ROUTE(){return ROUTE}
	static get SCOPE(){return SCOPE}
	static get RESOURCE(){return _RESOURCE}
	static get ALIAS(){return _ALIAS}

	/*
	 * Offers all the request types
	 */
	static get OPTIONS(){return OPTIONS}
	static get GET(){return GET}
	static get HEAD(){return HEAD}
	static get POST(){return POST}
	static get PUT(){return PUT}
	static get PATCH(){return PATCH}
	static get DELETE(){return DELETE}
	static get TRACE(){return TRACE}
	static get CONNECT(){return CONNECT}

	/*
	 * Offers basic resource structure
	 * @See Route constructor for custom selector
	 */
	static get $RESOURCE(){return _basicResource()}
}
