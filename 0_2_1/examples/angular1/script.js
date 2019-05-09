(() => {
	let REST_RESOURCE = trocha.$RESOURCE;
	// Now we are adding more routes to the default resource
	// Note this will only be used within the server routes
	REST_RESOURCE.list = {
		$id: false,
		$hide: true
	};
	REST_RESOURCE.create = {
		$hide: true,
		$id: false,
		$method: trocha.POST
	};
	REST_RESOURCE.update = {
		$hide: true,
		$method: trocha.PATCH
	};
	REST_RESOURCE["delete"] = {
		$hide: true,
		$method: trocha.DELETE
	};
	const ROUTES = {
		CLIENT: trocha({
			pre: 'templates', // Note relative route
			post: '.html',
			routes: {
				trochaJSDocs: 'https://dfoxpro.github.io/trochaJS',
				trochaJSAngularSRC: 'https://github.com/DFOXpro/trochaJS/tree/master/source/examples/angular1',
				posts: {
					$type: trocha.RESOURCE,
					$id: 'postId',
					comments: {}
				},
				users: {
					$type: trocha.RESOURCE,
					$id: 'userId'
				},
				data: { // Just for templates
					$type: trocha.RESOURCE,
					$id: 'dummyId'
				},
				index: {
				}
			}
		}),
		SERVER: trocha({
			domain:'https://jsonplaceholder.typicode.com',
			alwaysUrl: true,
			resource: REST_RESOURCE,
			routes: {
				posts: {
					$type: trocha.RESOURCE,
					$id: 'postId',
					comments: {}
				},
				users: {
					$type: trocha.RESOURCE,
					$id: 'userId'
				}
			}
		})
	};
	delete REST_RESOURCE;// No longer needed

	// This function must be somewhere else but I keep here for simplicity
	const xhrFail = (response) => {
		console.error('xhrFail', response);
		window.alert('The XHR fail, see console output')
	};

	// Generic angularjs controllers
	const emptyController = function($scope, $trocha) {
		// Do nothing
	};

	const listControllerGenerator = (type) => {
		return function($scope, $trocha) {// This is the controller
			$scope.data = {
				type: type
			};

			// I hope you dont get lost with this mix of names
			const xhrSuccess = (response) => $scope.data.response = response.data;
			$trocha.xhr($trocha.SERVER[type].list).then(xhrSuccess, xhrFail);
		}
	};

	// Note TrochaJS is not a module of angularjs... yet
	let app = angular.module("app", ['ngRoute']);

	// This is part of the core of this example
	app.factory('$trocha', [
		'$http',
		($http) => {
			var $trocha = trocha;
			$trocha.CLIENT = ROUTES.CLIENT;
			$trocha.SERVER = ROUTES.SERVER;
			$trocha.xhr = (route, path, data) => {
				let args = {
					url: route.path(path),
					method: route.$method
				}
				if(data) args.data = data;
				return $http(args);
			}
			return $trocha;
		}
	]);
	// This is part of the core of this example
	app.directive( 'thref', () => {// Trocha href
		return {
			restrict: 'A',
			link: ($scope, elements, attrs) => {
				// console.log('thref', $scope, elements, attrs);
				route = ROUTES.CLIENT;
				attrs.thref.split('.').forEach((r) => {
					route = route[r];
					// console.log(route, r);
					if(!route) throw "Invalid thref route"
				});
				if(attrs.tpath)
					try {
						attrs.tpath = JSON.parse(attrs.tpath)
					} catch(error){
						console.error('Invalid tpath JSON', error)
					}
				if("string" == typeof route)
					elements[0].href = route; // @TODO in future release this will be obsolete
				else elements[0].href = '#!' + route.path(attrs.tpath)//default hashprefix since 1.6
			}
		}
	});

	app.config([
		'$routeProvider',
		($routeProvider) => {
			$routeProvider.when(ROUTES.CLIENT.index.path(), {
				templateUrl: ROUTES.CLIENT.index.path({ext: true}),
				controller: ROUTES.CLIENT.index.$as
			})
			.when(ROUTES.CLIENT.users.list.path(), {
				templateUrl: ROUTES.CLIENT.data.list.path({ext: true, hide: false}),
				controller: ROUTES.CLIENT.users.list.$as
			}).when(ROUTES.CLIENT.posts.list.path(), {
				templateUrl: ROUTES.CLIENT.data.list.path({ext: true, hide: false}),
				controller: ROUTES.CLIENT.posts.list.$as
			}).otherwise({redirectTo: ROUTES.CLIENT.index.path()})
		}
	]);

	app.controller(ROUTES.CLIENT.index.$as, [
		'$scope', '$trocha', '$routeParams', emptyController
	]);

	app.controller(ROUTES.CLIENT.users.list.$as, [
		'$scope', '$trocha', listControllerGenerator(ROUTES.CLIENT.users.$as)
	]);
	
	app.controller(ROUTES.CLIENT.posts.list.$as, [
		'$scope', '$trocha', listControllerGenerator(ROUTES.CLIENT.posts.$as)
	]);

})();
