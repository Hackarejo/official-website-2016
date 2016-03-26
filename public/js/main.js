var app= angular.module('hackarejo', ['smoothScroll', 'nemLogging', 'ui-leaflet']);

app.config(function() {
	new WOW().init();
});

app.controller('main-controller', function() {

});