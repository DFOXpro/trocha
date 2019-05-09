describe('function path', () => {
	var myRoutes, myRoutesParams
	myRoutesParams = {
		pre: '/templates',
		post: '-myH45H.html',
		domain: 'https://mydomain.net.co',
		routes: {
			town: {
				$id: 'town_name',
				house: {
					$id: 'address'
				}
			}
		}
	}
	myRoutes = new Trocha({ ...myRoutesParams })
	describe('path() diferent params', () => {
		it('no params', () => {
			assert.throw(myRoutes.path)
			assert.equal(myRoutes.town.path(), '/town/:town_name')
			assert.equal(
				myRoutes.town.house.path(),
				'/town/:town_name/house/:address'
			)
		})
		it('url', () => {
			var _myRoutes, _myRoutesParams
			assert.equal(myRoutes.town.path(), '/town/:town_name')
			assert.equal(
				myRoutes.town.path({
					url: true
				}),
				'https://mydomain.net.co/town/:town_name'
			)
			assert.equal(
				myRoutes.town.house.path({url: true}),
				'https://mydomain.net.co/town/:town_name/house/:address'
			)
			_myRoutesParams = { ...myRoutesParams }
			_myRoutesParams.alwaysUrl = true
			_myRoutes = new Trocha(_myRoutesParams)
			assert.equal(
				_myRoutes.town.path(),
				'https://mydomain.net.co/town/:town_name'
			)
			assert.equal(
				_myRoutes.town.house.path(),
				'https://mydomain.net.co/town/:town_name/house/:address'
			)
			assert.equal(
				_myRoutes.town.path({
					url: false
				}),
				'/town/:town_name'
			)
		})
		it('pre', () => {
			assert.equal(myRoutes.town.path(), '/town/:town_name')
			assert.equal(
				myRoutes.town.path({
					pre: true
				}),
				'/templates/town/:town_name'
			)
		})
		it('post', () => {
			var _myRoutes, _myRoutesParams
			assert.equal(myRoutes.town.path(), '/town/:town_name')
			assert.equal(
				myRoutes.town.path({
					post: true
				}),
				'/town/:town_name-myH45H.html'
			)
			_myRoutesParams = { ...myRoutesParams }
			_myRoutesParams.alwaysPost = true
			_myRoutes = new Trocha(_myRoutesParams)
			assert.equal(_myRoutes.town.path(), '/town/:town_name-myH45H.html')
			assert.equal(
				_myRoutes.town.path({
					post: false
				}),
				'/town/:town_name'
			)
		})
		it('ext', () => {
			assert.equal(myRoutes.town.path(), '/town/:town_name')
			assert.equal(
				myRoutes.town.path({
					ext: true
				}),
				'/templates/town/:town_name-myH45H.html'
			)
		})
		it('hide', () => {
			var _myRoutes, _myRoutesParams
			assert.equal(
				myRoutes.town.path({
					hide: true
				}),
				'/:town_name'
			)
			_myRoutesParams = { ...myRoutesParams }
			_myRoutesParams.routes.town.$hide = true
			_myRoutes = new Trocha(_myRoutesParams)
			assert.equal(_myRoutes.town.path(), '/:town_name')
		})
		it('parentId', () => {
			assert.equal(
				myRoutes.town.house.path({
					parentId: false
				}),
				'/town/house/:address'
			)
		})
		it('id: false', () => {
			assert.equal(
				myRoutes.town.path({
					id: false
				}),
				'/town'
			)
			assert.equal(
				myRoutes.town.house.path({
					id: false
				}),
				'/town/:town_name/house'
			)
		})
		it('<someId>', () => {
			assert.equal(
				myRoutes.town.path({
					town_name: ''
				}),
				'/town/'
			)
			assert.equal(
				myRoutes.town.path({
					town_name: 'Engativá'
				}),
				'/town/Engativá'
			)
			assert.equal(
				myRoutes.town.house.path({
					address: 'calle_falsa'
				}),
				'/town/:town_name/house/calle_falsa'
			)
			assert.equal(
				myRoutes.town.house.path({
					address: 'calle_falsa',
					town_name: false
				}),
				'/town/house/calle_falsa'
			)
		})
		it('query', () => {
			assert.equal(
				myRoutes.town.path({
					query: {
						description: true
					}
				}),
				'/town/:town_name?description=true'
			)
			assert.equal(
				myRoutes.town.path({
					query: {
						description: true,
						pictures: 4
					}
				}),
				'/town/:town_name?description=true&pictures=4'
			)
			assert.equal(
				myRoutes.town.path({
					query: {
						an_array: ['qwe', 'asd', 'zxc']
					}
				}),
				'/town/:town_name?an_array[]=qwe&an_array[]=asd&an_array[]=zxc'
			)
			assert.equal(
				myRoutes.town.path({
					query: {
						an_array: ['qwe', 'asd', 'zxc'],
						ert: 1
					}
				}),
				'/town/:town_name?an_array[]=qwe&an_array[]=asd&an_array[]=zxc&ert=1'
			)
			assert.equal(
				myRoutes.town.path({
					query: {
						'ata?&ck': '&' + '?=;:/\\ \t'
					}
				}),
				'/town/:town_name?ata%3F%26ck=%26%3F%3D%3B%3A%2F%5C%20%09'
			)
		})
		it('fragment', () => {
			assert.equal(
				myRoutes.town.path({
					fragment: 'references'
				}),
				'/town/:town_name#references'
			)
		})
	})
})
