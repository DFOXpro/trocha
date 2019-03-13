((parent) => {
	/*
	 * Why variables are outside the Trocha class?
	 * Because private variables are still not supported
	 */
	include "./_variables.js"
	include "./_Route.js"

	parent.Trocha = class Trocha {
		constructor(height, width) {
			this.height = height
			this.width = width
		}
		/*
		 * STATIC AVAILABLE ATTRIBUTES
		 */
		include "./_statics.js"
	}

})(this)
