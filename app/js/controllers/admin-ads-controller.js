app.controller('AdminAdsController', function ($scope, $rootScope, adsData, usersData, notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';
    var NO_RESULTS_MESSAGE = 'No results to display';
    // Approve messages
    var AD_APPROVE_CONFIRM_MESSAGE = 'Would you like to approve the ad?';
    var AD_APPROVED_SUCCESSFULLY_MESSAGE = 'Ad approved successfully';
    var AD_CANNOT_BE_APPROVED_MESSAGE = 'Ad cannot be approved. Please try again later';
    // Reject messages
    var AD_REJECT_CONFIRM_MESSAGE = 'Would you like to reject the ad?';
    var AD_REJECTED_SUCCESSFULLY_MESSAGE = 'Ad rejected successfully';
    var AD_CANNOT_BE_REJECTED_MESSAGE = 'Ad cannot be rejected. Please try again later';
    var INITIAL_START_PAGE = 1;
    var PAGE_SIZE = 2;

    $scope.defaultImage = DEFAULT_AD_IMAGE;
    $scope.urlParams = {
        status: '',
        categoryId: '',
        townId: '',
        sortBy: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};
    $scope.adsLoaded = false;
    $scope.adsLoaded = false;
    $scope.hasResults = false;
    $scope.hasPagesToBeShown = false;

    adminAdsPageLoaded();

    // Event handlers
    $scope.$on('townFilterSelected', function (event, townSelected) {
        $scope.urlParams.townId = (townSelected === 'all') ? '' : townSelected;
        $scope.urlParams.startPage = 1;
        $scope.getAdminAds();
    });

    $scope.$on('categoryFilterSelected', function (event, categorySelected) {
        $scope.urlParams.categoryId = (categorySelected === 'all') ? '' : categorySelected;
        $scope.urlParams.startPage = 1;
        $scope.getAdminAds();
    });

    // Scope functions
    $scope.getAdminAds = function() {
        adsData.getAdminAds($scope.urlParams)
            .then(
            function (data) {
                console.log(data);
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
    
    $scope.approveAd = function (adId) {
        notifications.confirm(AD_APPROVE_CONFIRM_MESSAGE)
            .then(
                function () {
                    executeApproveAd(adId);
                })
    };

    $scope.rejectAd = function (adId) {
        notifications.confirm(AD_REJECT_CONFIRM_MESSAGE)
            .then(
            function () {
                executeRejectAd(adId);
            })
    };

    $scope.getAdminAds();

    // Private functions
    function adminAdsPageLoaded() {
        $rootScope.$broadcast('adminAdsPageLoaded');
    }

    function checkForEmptyData(data) {
        if (data.length === 0) {
            $scope.resultMessage = NO_RESULTS_MESSAGE;
        } else {
            $scope.resultMessage = '';
        }
    }

    function executeApproveAd(adId) {
        adsData.approveAd(adId)
            .then(function () {
                notifications.success().then(function () {
                    $scope.getAdminAds(AD_APPROVED_SUCCESSFULLY_MESSAGE);
                })
            },
            function () {
                notifications.error(AD_CANNOT_BE_APPROVED_MESSAGE);
            });
    }

    function executeRejectAd(adId) {
        adsData.rejectAd(adId)
            .then(function () {
                notifications.success().then(function () {
                    $scope.getAdminAds(AD_REJECTED_SUCCESSFULLY_MESSAGE);
                })
            },
            function () {
                notifications.error(AD_CANNOT_BE_REJECTED_MESSAGE);
            });
    }
});