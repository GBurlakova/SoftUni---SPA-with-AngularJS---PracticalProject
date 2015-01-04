app.controller('PublishNewAdController', function ($scope, $categoriesData, $townsData, $notifications) {
    var BASE_URL = 'http://softuni-ads.azurewebsites.net/api';
    // var BASE_URL = 'http://localhost:1337/api';

    $scope.newAdData = {
        adTitle: '',
        adText: '',
        imageDataUrl: '',
        category: '',
        town: ''
    };

    $townsData.getAll(BASE_URL).then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    $categoriesData.getAll(BASE_URL).then(
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
                $scope.newAdData.imageDataUrl = reader.result;
                $(".image-box").html("<img src='" + reader.result + "'>");
            };
            reader.readAsDataURL(file);
        } else {
            $(".image-box").html("<p>File type not supported!</p>");
        }
    };

    $scope.publish = function (newAdData) {
        console.log(data);
    }
});