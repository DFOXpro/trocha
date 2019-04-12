(() => {
	let lastRoute = '';
	const REST_RESOURCE = {
		$id: "id",
		update: {
			$method: trocha.PATCH,
			$hide: true
		},
		list: {
			$hide: true,
			$id: false
		},
		new: {
			$id: false
		},
		show: {
			$hide: true
		}
	};
	const serverRoutes = trocha({
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
	});

	// This function is the core of this example
	const doJqueryXHR = (route, path, data) => {
		lastRoute = route.path(path);
		return $.ajax({
			method: route.$method,
			url: lastRoute,
			data: data
		})
	};

	const printMessage = (msg) => {
		$("#from span").text(lastRoute);
		$("#message").text(JSON.stringify(msg))
	}

	$(document).ready(() => {
		$("#getUsers").on("click", ( event ) => doJqueryXHR(serverRoutes.users.list).done(printMessage));
		$("#getPost").on("click", ( event ) => doJqueryXHR(serverRoutes.posts.show, {postId: 1}).done(printMessage));
		$("#getComments").on("click", ( event ) => doJqueryXHR(serverRoutes.posts.comments, {
			postId: 1,
			query: {
				userId: 1
			}
		}).done(printMessage));
	})
})();
