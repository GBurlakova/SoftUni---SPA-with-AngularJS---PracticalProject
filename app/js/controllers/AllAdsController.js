app.controller('AllAdsController', function AllAdsController($scope, $data) {
    $data.ads.getAll().then(
        function (data, status, headers, config) {
            $scope.ads = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });
})