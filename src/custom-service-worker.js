self.addEventListener('fetch', (e) => {
	console.log(`intercepting ${e.request.method} to ${e.request.url}`);
});

self.addEventListener('message', () => {
	console.log('just received from client that state has been updated!');
});
