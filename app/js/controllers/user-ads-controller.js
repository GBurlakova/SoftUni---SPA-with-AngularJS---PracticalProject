app.controller('UserAdsController', function ($scope, $rootScope, adsData, usersData, notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';
    var NO_RESULTS_MESSAGE = 'No results to display';
    var AD_PUBLISHED_AGAIN_MESSAGE = 'Ad published again successfully';
    var AD_DEACTIVATED_MESSAGE = 'Ad deactivated successfully';
    var INITIAL_START_PAGE = 1;
    var PAGE_SIZE = 5;

    $scope.defaultImage = DEFAULT_AD_IMAGE;
    $scope.urlParams = {
        status: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};
    $scope.adsLoaded = false;
    $scope.adsLoaded = false;
    $scope.hasResults = false;
    $scope.hasPagesToBeShown = false;

    userAdsPageLoaded();

    // Events
    $scope.$on('adStatusSelected', function (event, status) {
        $scope.urlParams.status = status;
        $scope.getUserAds();
    });

    // Scope functions
    $scope.getUserAds = function() {
        adsData.getUsersAds($scope.urlParams)
            .then(
            function (data) {
                $scope.ads = data;
                $scope.adsLoaded = true;
                $scope.hasResults = data.ads.length > 0;
                $scope.hasPagesToBeShown = data.numPages > 1;
                checkForEmptyData(data.ads);
            },
            function (error) {
                console.log(error);
            });
    };

    $scope.getUserAds();

    $scope.deactivateAd = function (adId) {
        adsData.deactivateAd(adId)
            .then(function () {
                notifications.success(AD_DEACTIVATED_MESSAGE)
                    .then(function () {
                        $scope.getUserAds();
                    });
            }, function () {

            });
    };

    $scope.publishAdAgain = function (adId) {
        adsData.publishAdAgain(adId)
            .then(function () {
                notifications.success(AD_PUBLISHED_AGAIN_MESSAGE)
                    .then(function () {
                        $scope.getUserAds();
                    });
            }, function () {

            });
    };

    // Private functions
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
});