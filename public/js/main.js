var app= angular.module('hackarejo', ['smoothScroll', 'nemLogging', 'ui-leaflet']);

app.config(function() {
	new WOW().init();
});

app.controller('main-controller', function($scope) {
	var hackLat = -26.069740;
	var hackLng = -53.043451;

	angular.extend($scope, {
		citfb: {
			lat: hackLat, 
			lng: hackLng,
			zoom: 18
		},

		marker: {
			mainMarker: {
				lat: hackLat,
				lng: hackLng,
				focus: true,
				message: "CITFBE - Hackarejo 2016",
				draggable: false
			}
		}
	});
});