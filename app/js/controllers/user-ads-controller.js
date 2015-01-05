app.controller('UserAdsController', function ($scope, $adsData) {
    var INITIAL_START_PAGE = 2;
    var PAGE_SIZE = 13;

    $scope.urlParams = {
        status: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};

    $adsData.getUsersAds($scope.urlParams)
        .then(
            function (data) {
                console.log(data);
            },
            function () {

            });
});