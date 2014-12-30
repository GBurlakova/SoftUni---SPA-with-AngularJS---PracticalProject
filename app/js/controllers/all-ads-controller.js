app.controller('AllAdsController', function AllAdsController($scope, $adsData) {
    // var baseUrl = 'http://softuni-ads.azurewebsites.net/api';
    var baseUrl = 'http://localhost:1337/api';

    $adsData.getAll(baseUrl).then(
        function (data, status, headers, config) {
            $scope.ads = data.ads;
            console.log(data);
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });
});