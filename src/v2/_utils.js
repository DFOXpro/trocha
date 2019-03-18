let _throwError = (scope, error_text, value) => {
	class TrochaError extends Error {
		constructor(scope, error_text, value) {
			// Pass remaining arguments (including vendor specific ones) to parent constructor
			super(ERROR_HEADER+error_text)
			
			// Custom debugging information
			this.scope = scope
			this.value = value
		}
	}
	throw new TrochaError(scope, error_text, value)
}

let _throwWarning = (scope, warning_text, value) => {
	console.warn(WARNING_HEADER+warning_text, value||s, scope||s)
}
