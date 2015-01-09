app.controller('DeleteAdController', function ($scope, $rootScope, $routeParams, $location,
                                                adsData, usersData, notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';
    var AD_DELETED_SUCCESSFULLY_MESSAGE = 'Ad deleted successfully.';
    var AD_CANNOT_BE_DELETED_MESSAGE = 'Ad cannot be deleted at the moment. Please try again later!';
    var CONFIRM_DELETE_MESSAGE = 'Would you like to delete the ad?';
    var adToBeDeletedId = $routeParams.id;

    $scope.defaultImage = DEFAULT_AD_IMAGE;
    $scope.changeImageFunctionSelected = false;
    $scope.adNotLoaded = true;

    deleteAdPageLoaded();

    adsData.getUserAdById(adToBeDeletedId)
        .then(
            function (data) {
                console.log(data);
                $scope.adToBeDeleted = data;
                $scope.adNotLoaded = false;
            },
            function (error) {
                console.log(error);
            }
        );

    // Scope functions
    $scope.cancel = function () {
        $location.path('/user/ads');
    };

    $scope.deleteAd = function (adId) {
        notifications.confirm(CONFIRM_DELETE_MESSAGE).then(function () {
            executeDeleteAdCommand(adId);
        })
    };

    // Private functions
    function deleteAdPageLoaded() {
        $rootScope.$broadcast('deleteAdPageLoaded');
    }

    function executeDeleteAdCommand(adId) {
        usersData.deleteAd(adId)
            .then(function () {
                notifications.success(AD_DELETED_SUCCESSFULLY_MESSAGE)
                    .then(function () {
                        $location.path('/user/ads');
                    });
            }, function () {
                notifications.error(AD_CANNOT_BE_DELETED_MESSAGE);
            });
    }
});