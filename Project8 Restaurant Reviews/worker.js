self.addEventListener('fetch',function(event){
	console.log(event.request);
	event.respondWith(caches.match(event.request)
		.then(function(response) {
	        if (response) {
	          return response;
	        }
	        return fetch(event.request);
		})
  	);
	let fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            let responseToCache = response.clone();

            caches.open('restaurant-cache-v1')
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );

});

self.addEventListener('install', function(event) {

	urlsToCache = [
	'/',
	'js/dbhelper.js',
	'js/main.js',
	'js/restaurant_info.js',
	'css/styles.css',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
	'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
	'data/restaurants.json',
	'https://unpkg.com/leaflet@1.3.1/dist/images/marker-icon.png'
	];

	//Add images to cache urls
	for(let i = 1; i <= 10; i++){
		urlsToCache.push(`img/${i}.jpg`);
	}

	event.waitUntil(
		caches.open('restaurant-cache-v1')
			.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});
