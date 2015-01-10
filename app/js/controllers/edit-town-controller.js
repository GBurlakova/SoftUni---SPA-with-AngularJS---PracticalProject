app.controller('EditTownController', function ($scope, $rootScope, $routeParams, $location,
                                                   townsData, notifications) {
    var TOWN_EDIT_CONFIRM_MESSAGE = 'Would you like to edit town';
    var TOWN_EDIT_SUCCESSFULLY_MESSAGE = 'Town edited successfully.';
    var TOWN_CANNOT_BE_EDITED_MESSAGE = 'Town cannot be edited at the moment. Please try again later!';
    var townToBeEditedId = $routeParams.id;
    var townName = $routeParams.name;

    $scope.town = {
        name: townName
    };

    editTownPageLoaded();

    $scope.editTown = function () {
        notifications.confirm(TOWN_EDIT_CONFIRM_MESSAGE).then(function () {
            executeEditTown();
        });
    };

    // Private function
    function editTownPageLoaded() {
        $rootScope.$broadcast('editTownPageLoaded')
    }

    function executeEditTown() {
        townsData.editTown(townToBeEditedId)
            .then(
            function () {
                notifications.success(TOWN_EDIT_SUCCESSFULLY_MESSAGE).then(function () {
                    $location.path('/admin/towns');
                });
            },
            function () {
                notifications.error(TOWN_CANNOT_BE_EDITED_MESSAGE);
            })
    }
});