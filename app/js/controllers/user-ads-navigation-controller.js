app.controller('UserAdsNavigationController', function ($scope, $rootScope, $location) {
    $scope.showUserAdsNavigation = true;
    var currentStatusSelected = 'All';

    $scope.$watch(function(){
        return $location.path();
    }, function(value){
        if (value === '/user/ads') {
            $scope.showUserAdsNavigation = true;
        } else {
            $scope.showUserAdsNavigation = false;
        }
    });

    // Scope functions
    $scope.selectAdStatus = function (adStatus) {
        $rootScope.$broadcast('adStatusSelected', adStatus);
        currentStatusSelected = adStatus;
    };

    $scope.getClass = function (adStatus) {
        if (adStatus === currentStatusSelected) {
            return 'active';
        } else {
            return '';
        }
    }
});