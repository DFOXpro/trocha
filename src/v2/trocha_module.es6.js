/**
 * This file is intended for module enviorements
 * Works like React
 * Note we also make public a lot of const for easy usage
 */
include "_core.js"
export {
	Trocha,
	Route,
	Alias,
	Resource,
	Scope,

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
	_RESOURCE as RESOURCE,
	_ALIAS as ALIAS,

	// Resource fun
	_basicResource as $RESOURCE,
}
