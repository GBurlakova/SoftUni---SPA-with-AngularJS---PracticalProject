app.controller('CreateTownController', function ($scope, $rootScope, $location,
                                                     townsData, notifications) {
    var TOWN_CREATE_CONFIRM_MESSAGE = 'Would you like to create town';
    var TOWN_CREATED_SUCCESSFULLY_MESSAGE = 'Town created successfully.';
    var TOWN_CANNOT_BE_CREATED_MESSAGE = 'Town cannot be created at the moment. Please try again later!';

    createTownPageLoaded();

    $scope.town = {
        name: ''
    };

    $scope.createTown = function () {
        notifications.confirm(TOWN_CREATE_CONFIRM_MESSAGE).then(function () {
            executeCreateTown();
        });
    };

    // Private function
    function createTownPageLoaded() {
        $rootScope.$broadcast('createTownPageLoaded')
    }

    function executeCreateTown() {
        townsData.createTown($scope.town)
            .then(
            function () {
                notifications.success(TOWN_CREATED_SUCCESSFULLY_MESSAGE).then(function () {
                    $location.path('/admin/towns');
                });
            },
            function () {
                notifications.success(TOWN_CANNOT_BE_CREATED_MESSAGE);
            })
    }
});