app.controller('AllAdsController', function AllAdsController($scope, $rootScope, $adsData) {
    // var baseUrl = 'http://softuni-ads.azurewebsites.net/api';
    var baseUrl = 'http://localhost:1337/api';
    var NO_RESULTS_MESSAGE = 'No results to display';
    var categoryFilter = '';
    var townFilter = '';

    $adsData.getAll(baseUrl).then(
        function (data, status, headers, config) {
            $scope.ads = data.ads;
            checkForEmptyData(data.ads);
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    $scope.$on('townFilterSelected', function (event, townSelected) {
        townFilter = (townSelected === 'all') ? '' : townSelected;
        filterByTown();
    });

    $scope.$on('categoryFilterSelected', function (event, categorySelected) {
        categoryFilter = (categorySelected === 'all') ? '' : categorySelected;
        filterByCategory();
    });

    function filterByTown() {
        $adsData.getWithFilter(baseUrl, townFilter, categoryFilter).then(
            function (data, status, headers, config) {
                $scope.ads = data.ads;
                checkForEmptyData(data.ads);
            },
            function (error, status, headers, config) {
                console.log(error, status);
            });
    };

    function filterByCategory() {
        $adsData.getWithFilter(baseUrl, townFilter, categoryFilter).then(
            function (data, status, headers, config) {
                $scope.ads = data.ads;
                checkForEmptyData(data.ads);
            },
            function (error, status, headers, config) {
                console.log(error, status);
            });
    };

    function checkForEmptyData(data) {
        if (data.length === 0) {
        	$scope.resultMessage = NO_RESULTS_MESSAGE;
        } else {
            $scope.resultMessage = '';
        }
    }
});