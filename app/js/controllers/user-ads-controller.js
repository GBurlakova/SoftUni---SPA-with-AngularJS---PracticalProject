app.controller('UserAdsController', function ($scope, $adsData) {
    var BASE_URL = 'http://softuni-ads.azurewebsites.net/api';
    // var BASE_URL = 'http://localhost:1337/api';
    var INITIAL_START_PAGE = 2;
    var PAGE_SIZE = 13;

    $scope.urlParams = {
        status: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};

    $adsData.getUsersAds(BASE_URL, $scope.urlParams)
        .then(
            function (data) {
                console.log(data);
            },
            function () {

            });
});