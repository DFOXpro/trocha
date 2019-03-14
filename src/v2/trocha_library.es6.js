/**
 * This file is intended for non module enviorements
 * Works like JQuery or legacy angular
 * Note the parent can be within a clousure or be self(window or worker)
 */
((parent) => {
	include "_core.js"
	self.Trocha = Trocha//fucking babel
	parent.Trocha = Trocha
})(this)
