app.controller('DeleteAdController', function ($scope, $rootScope, $routeParams, $location,
                                             $townsData, $categoriesData, $adsData, usersData, $notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';
    var adToBeDeletedId = $routeParams.id;

    $scope.defaultImage = DEFAULT_AD_IMAGE;
    $scope.changeImageFunctionSelected = false;
    $scope.adNotLoaded = true;

    deleteAdPageLoaded();

    $adsData.getUserAdById(adToBeDeletedId)
        .then(function (data) {
            console.log(data);
            $scope.adToBeDeleted = data;
            $scope.adNotLoaded = false;
        }, function () {
        });

    $scope.cancel = function () {
        $location.path('/user/ads');
    };

    $scope.deleteAd = function (adId) {
        usersData.deleteAd(adId)
            .then(function () {
                $notifications.success('Ad deleted successfully');
            }, function () {

            });
    };

    // Private functions
    function deleteAdPageLoaded() {
        $rootScope.$broadcast('deleteAdPageLoaded');
    }
});