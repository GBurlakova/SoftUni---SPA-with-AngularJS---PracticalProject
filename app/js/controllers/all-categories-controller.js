app.controller('AllCategoriesController', function ($scope, $rootScope, categoriesData) {
    var NO_RESULTS_MESSAGE = 'No results to display';
    var INITIAL_START_PAGE = 1;
    var PAGE_SIZE = 5;

    $scope.urlParams = {
        sortBy: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};
    $scope.categoriesLoaded = false;
    $scope.hasResults = false;
    $scope.hasPagesToBeShown = false;

    allCategoriesPageLoaded();

    $scope.getCategories = function () {
        categoriesData.getAdminCategories($scope.urlParams)
            .then(
            function (data) {
                $scope.categories = data;
                $scope.categoriesLoaded = true;
                $scope.hasResults = data.categories.length > 0;
                $scope.hasPagesToBeShown = data.numPages > 1;
                checkForEmptyData(data.categories);
                console.log(data);
            },
            function () {

            })
    };

    $scope.getCategories();

    // Private functions
    function allCategoriesPageLoaded() {
        $rootScope.$broadcast('allCategoriesPageLoaded');
    }

    function checkForEmptyData(data) {
        if (data.length === 0) {
            $scope.resultMessage = NO_RESULTS_MESSAGE;
        } else {
            $scope.resultMessage = '';
        }
    }
});