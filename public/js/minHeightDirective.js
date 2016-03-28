app.directive('minHeight', function($window) {
		return {
			restrict: 'A',
			scope: {
				offset: '='
			},
			link: function postLink(scope, elem,attrs) {
				var offset = attrs.offset || 0;
				var minHeight = $window.innerHeight - offset;
				
				elem[0].style.minHeight = minHeight;
			}
		};
});