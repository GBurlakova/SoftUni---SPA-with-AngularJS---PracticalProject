app.controller('EditAdController', function ($scope, $rootScope, $routeParams, $townsData, $categoriesData, $adsData, $notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';

    $scope.adImage = DEFAULT_AD_IMAGE;

    $scope.updatedAdData = {
        title: '',
        text: '',
        imageDataUrl: '',
        categoryId: '',
        townId: ''
    };

    var adToBeEditedId = $routeParams.id;

    $adsData.getUserAdById(adToBeEditedId)
        .then(function (data) {
            console.log(data);
            $scope.updatedAdData = {
                title: data.title,
                text: data.text,
                imageDataUrl: data.imageDataUrl,
                categoryId: data.categoryId,
                townId: data.townId
            };
        }, function () {

        });

    editAdPageLoaded();

    $townsData.getAll().then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    $categoriesData.getAll().then(
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    $scope.publishAdAgain = function (adId) {
//        $usersData.editAd(adId)
//            .then(function () {
//                $notifications.success('Ad published again successfully');
//                getUserAds();
//            }, function () {
//
//            });
    };

    function editAdPageLoaded() {
        $rootScope.$broadcast('editAdPageLoaded');
    }
});