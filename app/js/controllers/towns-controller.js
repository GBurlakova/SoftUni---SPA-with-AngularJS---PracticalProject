app.controller('TownsController', function TownsController($scope, $rootScope, $townsData) {
    // var baseUrl = 'http://softuni-ads.azurewebsites.net/api';
    var baseUrl = 'http://localhost:1337/api';
    var currentTownSelected = 'all';

    $townsData.getAll(baseUrl).then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    $scope.townClicked = function (townSelected) {
        currentTownSelected = townSelected;
        $rootScope.$broadcast('townFilterSelected', townSelected);
    };

    $scope.getClass = function (townId) {
        if (townId === currentTownSelected) {
            return 'active';
        } else {
            return '';
        }
    }
});