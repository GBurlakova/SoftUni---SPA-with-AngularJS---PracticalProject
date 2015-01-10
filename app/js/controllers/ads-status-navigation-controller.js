app.controller('AdsStatusNavigationController', function ($scope, $rootScope, $location) {
    $scope.showAdsStatusNavigation = true;
    var currentStatusSelected = 'All';

    $scope.$watch(function(){
        return $location.path();
    }, function(value){
        if (value === '/user/ads' || value === '/admin/ads') {
            $scope.showAdsStatusNavigation = true;
        } else {
            $scope.showAdsStatusNavigation = false;
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