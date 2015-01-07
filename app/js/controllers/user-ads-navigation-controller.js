app.controller('UserAdsNavigationController', function ($scope, $rootScope, $location) {
    $scope.showUserAdsNavigation = true;

    $scope.$watch(function(){
        return $location.path();
    }, function(value){
        if (value === '/user/ads') {
            $scope.showUserAdsNavigation = true;
        } else {
            $scope.showUserAdsNavigation = false;
        }
    });

    $scope.selectAdStatus = function (status) {
        $rootScope.$broadcast('adStatusSelected', status);
    }
});