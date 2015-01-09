app.controller('PublishNewAdController', function ($scope, $rootScope, $location, categoriesData,
                                                   townsData, usersData, notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';
    var PUBLISH_AD_CONFIRM_MESSAGE = 'Would you like to publish the ad?';
    var AD_PUBLISHED_SUCCESSFULLY_MESSAGE = 'Ad published successfully';
    var AD_CANNOT_BE_PUBLISHED_MESSAGE = 'Ad cannot be published. Please try again later!';

    $scope.adImage = DEFAULT_AD_IMAGE;

    $scope.newAdData = {
        title: '',
        text: '',
        imageDataUrl: '',
        categoryId: '',
        townId: ''
    };

    publishNewAdPageLoaded();

    townsData.getAll().then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    categoriesData.getAll().then(
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    // Scope functions
    $scope.fileSelected = function(fileInputField) {
        delete $scope.newAdData.imageDataUrl;
        var file = fileInputField.files[0];
        if (file.type.match(/image\/.*/)) {
            var reader = new FileReader();
            reader.onload = function() {
                var image = reader.result;
                $scope.newAdData.imageDataUrl = image;
                $("#ad-image").html("<img src='" + image + "'>");
            };
            reader.readAsDataURL(file);
        } else {
            $("#ad-image").html("<p>File type not supported!</p>");
        }
    };

    $scope.publish = function (newAdData) {
        notifications.confirm(PUBLISH_AD_CONFIRM_MESSAGE).then(function () {
            executePublishAd(newAdData);
        })
    };

    // Private functions
    function publishNewAdPageLoaded() {
        $rootScope.$broadcast('publishNewAdPageLoaded');
    }

    function executePublishAd(newAdData) {
        usersData.publish(newAdData)
            .then(
            function () {
                notifications.success(AD_PUBLISHED_SUCCESSFULLY_MESSAGE)
                    .then(function () {
                        $location.path('/user/ads');
                    })
            }, function () {
                notifications.error(AD_CANNOT_BE_PUBLISHED_MESSAGE)
                    .then(function () {
                        $location.path('/user/ads');
                    })
            });
    }
});