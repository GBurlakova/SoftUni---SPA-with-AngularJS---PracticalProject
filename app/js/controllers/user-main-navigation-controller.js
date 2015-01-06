app.controller('UserMainNavigationController', function ($scope, $location) {
    $scope.getClass = function (page) {
        var currentRoute = $location.path();
        return page === currentRoute ? 'active' : '';
    }
});