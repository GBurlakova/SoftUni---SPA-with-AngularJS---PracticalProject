app.controller('UserAdsNavigationController', function ($scope, $location) {
    $scope.showUserAdsNavigation = true;

    $scope.$watch(function(){
        return $location.path();
    }, function(value){
        if (value === '/user/ads') {
            $scope.showUserAdsNavigation = true;
        } else {
            $scope.showUserAdsNavigation = false;
        }
    })
});