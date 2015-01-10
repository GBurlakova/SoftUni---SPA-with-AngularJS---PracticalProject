app.controller('DeleteUserController', function ($scope, $rootScope, $routeParams, $location,
                                                 usersData, notifications) {
    var INITIAL_START_PAGE = 1;
    var PAGE_SIZE = 5;
    var userToBeDeleted = $routeParams.username;

    $scope.urlParams = {
        orderBy: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};

    $scope.getUsers = function () {
        usersData.getUserByUsername(userToBeDeleted)
            .then(
            function (data) {
                console.log(data);
            },
            function () {

            })
    };

    $scope.getUsers();

    // Private functions
});