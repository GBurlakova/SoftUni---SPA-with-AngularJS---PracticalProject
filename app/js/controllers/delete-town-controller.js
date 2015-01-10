app.controller('DeleteTownController', function ($scope, $rootScope, $routeParams, $location,
                                                     townsData, notifications) {
    var TOWN_DELETE_CONFIRM_MESSAGE = 'Would you like to delete town';
    var TOWN_DELETED_SUCCESSFULLY_MESSAGE = 'Town deleted successfully.';
    var TOWN_CANNOT_BE_DELETED_MESSAGE = 'Town cannot be deleted at the moment. Please try again later!';
    var townToBeDeletedId = $routeParams.id;
    $scope.town = $routeParams.name;

    deleteTownPageLoaded();

    $scope.deleteTown = function () {
        notifications.confirm(TOWN_DELETE_CONFIRM_MESSAGE).then(function () {
            executeDeleteTown();
        });
    };

    // Private function
    function deleteTownPageLoaded() {
        $rootScope.$broadcast('deleteTownPageLoaded')
    }

    function executeDeleteTown() {
        townsData.deleteTown(townToBeDeletedId)
            .then(
            function () {
                notifications.success(TOWN_DELETED_SUCCESSFULLY_MESSAGE).then(function () {
                    $location.path('/admin/towns');
                });
            },
            function () {
                notifications.error(TOWN_CANNOT_BE_DELETED_MESSAGE);
            })
    }
});