app.directive('pagination', [function () {
    return {
        restrict: 'A',
        templateUrl: 'js/directives/paginationTemplate.html',
        scope: true,
        link: function (scope) {
            scope.goToFirstPage = function () {
                scope.requestParams.startPage = 1;
                scope.loadAds(scope.requestParams);
            };
            scope.goToPreviousPage = function () {
                if (scope.requestParams.startPage > 1) {
                    scope.requestParams.startPage -= 1;
                }

                scope.loadAds(scope.requestParams);
            };

            scope.goToPage = function (pageToLoad) {
                scope.requestParams.startPage = pageToLoad;
                scope.loadAds(scope.requestParams);
            };

            scope.goToNextPage = function (length) {
                if (scope.requestParams.startPage < length) {
                    scope.requestParams.startPage += 1;
                }

                scope.loadAds(scope.requestParams);
            };

            scope.goToLastPage = function (length) {
                scope.requestParams.startPage = length;
                scope.loadAds(scope.requestParams);
            };
        }
    }
}]);