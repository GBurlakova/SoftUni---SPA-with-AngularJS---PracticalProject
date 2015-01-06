app.controller('UserAdsController', function ($scope, $rootScope, $adsData) {
    var INITIAL_START_PAGE = 1;
    var PAGE_SIZE = 10;

    userAdsPageLoaded();

    $scope.urlParams = {
        status: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};

    $adsData.getUsersAds($scope.urlParams)
        .then(
            function (data) {
                $scope.ads = data.ads;
                console.log(data);
            },
            function (error) {
                console.log(error);
            });

    function userAdsPageLoaded() {
        $rootScope.$broadcast('userAdsPageLoaded');
    }
});