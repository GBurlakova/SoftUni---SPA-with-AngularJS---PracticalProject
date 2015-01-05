app.controller('PublishNewAdController', function ($scope, $rootScope, $categoriesData, $townsData, $notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';

    $scope.adImage = DEFAULT_AD_IMAGE;

    $scope.newAdData = {
        adTitle: '',
        adText: '',
        imageDataUrl: '',
        category: '',
        town: ''
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
                $scope.adImage = image;
            };
            reader.readAsDataURL(file);
        } else {
            $("#ad-image").html("<p>File type not supported!</p>");
        }
    };

    $scope.publish = function (newAdData) {
        console.log(data);
    };

    function publishNewAdPageLoaded() {
        $rootScope.$broadcast('publishNewAdPageLoaded');
    }
});