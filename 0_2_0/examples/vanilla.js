(() => {
	const clientRoutes = trocha({
		routes: {
			post: {
				$id: 'postId',
				list: {
					$hide: true,
					$id: false
				},
				show: {
					$hide: true
				},
				comments: {}
			},
			users: {
				$id: 'userId',
				list: {
					$hide: true,
					$id: false
				},
				show: {
					$hide: true
				}
			}
		}
	});

	const printMessage = (event) => {
		event.preventDefault();
		document.getElementById("message").textContent = 'Hi! from: ' + event.target.href
	};

	// This function is the core of this example
	const replaceHref = () => {
		Array.prototype.forEach.call(document.getElementsByTagName("a"), (link) => {
			if(link.dataset.href){
				link.href = eval(
					"clientRoutes." +
					link.dataset.href
				).path(
					link.dataset.path ? JSON.parse(link.dataset.path) : {}
				);
				link.onclick = printMessage
			}
		});
	};

	window.onload = () => {
		replaceHref();
	}
})();
