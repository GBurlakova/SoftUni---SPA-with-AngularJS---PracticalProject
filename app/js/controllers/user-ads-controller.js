app.controller('UserAdsController', function ($scope, $rootScope, $adsData, usersData, $notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';
    var NO_RESULTS_MESSAGE = 'No results to display';
    var INITIAL_START_PAGE = 1;
    var PAGE_SIZE = 10;

    $scope.defaultImage = DEFAULT_AD_IMAGE;
    $scope.urlParams = {
        status: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};

    userAdsPageLoaded();
    getUserAds();

    // Scope functions
    $scope.deactivateAd = function (adId) {
        usersData.deactivateAd(adId)
            .then(function () {
                $notifications.success('Ad deactivated successfully');
                getUserAds();
            }, function () {

            });
    };

    $scope.publishAdAgain = function (adId) {
        usersData.publishAdAgain(adId)
            .then(function () {
                $notifications.success('Ad published again successfully');
                getUserAds();
            }, function () {

            });
    };

    // Private functions
    function getUserAds() {
        $adsData.getUsersAds($scope.urlParams)
            .then(
            function (data) {
                $scope.ads = data.ads;
                checkForEmptyData(data.ads);
                console.log(data.ads);
            },
            function (error) {
                console.log(error);
            });
    }

    function userAdsPageLoaded() {
        $rootScope.$broadcast('userAdsPageLoaded');
    }

    function checkForEmptyData(data) {
        if (data.length === 0) {
            $scope.resultMessage = NO_RESULTS_MESSAGE;
        } else {
            $scope.resultMessage = '';
        }
    }

    // Events
    $scope.$on('adStatusSelected', function (event, status) {
        $scope.urlParams.status = status;
        getUserAds();
    })
});