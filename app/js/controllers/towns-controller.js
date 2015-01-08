app.controller('TownsController', function TownsController($scope, $rootScope, townsData) {
    var currentTownSelected = 'all';

    townsData.getAll().then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    // Scope functions
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