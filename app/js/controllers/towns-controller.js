app.controller('TownsController', function TownsController($scope, $townsData) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api';
    // var baseUrl = 'http://localhost:1337/api';

    $townsData.getAll(baseUrl).then(
        function (data, status, headers, config) {
            $scope.towns = data;
            console.log(data);
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });
});