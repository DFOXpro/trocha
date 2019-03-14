/**
 * This file is intended for module enviorements
 * Works like React
 * Note we also make public a lot of const for easy usage
 */
include "_core.js"
export {
	Trocha,
	Route,

	// Request method types
	OPTIONS,
	GET,
	HEAD,
	POST,
	PUT,
	PATCH,
	DELETE,
	TRACE,
	CONNECT,

	// Route types
	ROUTE,
	SCOPE,
	RESOURCE,
	_ALIAS as ALIAS,
	_basicResource as $RESOURCE,
}
