app.controller('UserMainNavigationController', function ($scope, $location) {
    // Scope functions
    $scope.getClass = function (page) {
        var currentRoute = $location.path();
        return page === currentRoute ? 'active' : '';
    }
});