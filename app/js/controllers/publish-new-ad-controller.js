app.controller('PublishNewAdController', function ($scope, $rootScope, $categoriesData, $townsData, usersData, $notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';

    $scope.adImage = DEFAULT_AD_IMAGE;

    $scope.newAdData = {
        title: '',
        text: '',
        imageDataUrl: '',
        categoryId: '',
        townId: ''
    };

    publishNewAdPageLoaded();

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
        usersData.publish(newAdData).then(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
    };

    function publishNewAdPageLoaded() {
        $rootScope.$broadcast('publishNewAdPageLoaded');
    }
});