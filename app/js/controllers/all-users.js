app.controller('AllUsersController', function ($scope, $rootScope, usersData) {
    var NO_RESULTS_MESSAGE = 'No results to display';
    var INITIAL_START_PAGE = 1;
    var PAGE_SIZE = 5;

    $scope.urlParams = {
        orderBy: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};
    $scope.usersLoaded = false;
    $scope.hasResults = false;
    $scope.hasPagesToBeShown = false;

    allUsersPageLoaded();

    $scope.getUsers = function () {
        usersData.getUsers($scope.urlParams)
            .then(
                function (data) {
                    $scope.users = data;
                    $scope.usersLoaded = true;
                    $scope.hasResults = data.users.length > 0;
                    $scope.hasPagesToBeShown = data.numPages > 1;
                    checkForEmptyData(data.users);
                    console.log(data);
                },
                function () {

            })
    };

    $scope.getUsers();

    // Private functions
    function allUsersPageLoaded() {
        $rootScope.$broadcast('allUsersPageLoaded');
    }

    function checkForEmptyData(data) {
        if (data.length === 0) {
            $scope.resultMessage = NO_RESULTS_MESSAGE;
        } else {
            $scope.resultMessage = '';
        }
    }
});