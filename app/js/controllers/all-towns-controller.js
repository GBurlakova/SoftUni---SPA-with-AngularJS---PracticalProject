app.controller('AllTownsController', function ($scope, $rootScope, townsData) {
    var NO_RESULTS_MESSAGE = 'No results to display';
    var INITIAL_START_PAGE = 1;
    var PAGE_SIZE = 5;

    $scope.urlParams = {
        sortBy: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};
    $scope.townsLoaded = false;
    $scope.hasResults = false;
    $scope.hasPagesToBeShown = false;

    allTownsPageLoaded();

    $scope.getTowns = function () {
        townsData.getAdminTowns($scope.urlParams)
            .then(
            function (data) {
                $scope.towns = data;
                $scope.townsLoaded = true;
                $scope.hasResults = data.towns.length > 0;
                $scope.hasPagesToBeShown = data.numPages > 1;
                checkForEmptyData(data.towns);
                console.log(data);
            },
            function () {

            })
    };

    $scope.getTowns();

    // Private functions
    function allTownsPageLoaded() {
        $rootScope.$broadcast('allTownsPageLoaded');
    }

    function checkForEmptyData(data) {
        if (data.length === 0) {
            $scope.resultMessage = NO_RESULTS_MESSAGE;
        } else {
            $scope.resultMessage = '';
        }
    }
});