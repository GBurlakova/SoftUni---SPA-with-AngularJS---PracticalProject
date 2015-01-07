app.controller('AllAdsController', function AllAdsController($scope, $rootScope, $adsData) {
    var NO_RESULTS_MESSAGE = 'No results to display';
    var INITIAL_START_PAGE = 1;
    var PAGE_SIZE = 10;

    $scope.requestParams = {
        townId: '',
        categoryId: '',
        startPage: INITIAL_START_PAGE,
        pageSize: PAGE_SIZE};

    $scope.defaultImage = 'http://www.agetruck.com/truck_img/default.gif';

    homePageLoaded();

    $scope.loadAds = function (adsRequestParams) {
        $adsData.get(adsRequestParams).then(
            function (data) {
                $scope.ads = data.ads;
                $scope.pagesArray = new Array(data.numPages);
                $scope.showPager = data.numPages > 1;
                checkForEmptyData(data.ads);
            },
            function (error, status, headers, config) {
                console.log(error, status);
            })
    };

    $scope.loadAds($scope.requestParams);

    // Event handlers
    $scope.$on('townFilterSelected', function (event, townSelected) {
        $scope.requestParams.townId = (townSelected === 'all') ? '' : townSelected;
        $scope.requestParams.startPage = 1;
        $scope.loadAds($scope.requestParams);
    });

    $scope.$on('categoryFilterSelected', function (event, categorySelected) {
        $scope.requestParams.categoryId = (categorySelected === 'all') ? '' : categorySelected;
        $scope.requestParams.startPage = 1;
        $scope.loadAds($scope.requestParams);
    });

    // Private functions
    function homePageLoaded() {
        $rootScope.$broadcast('homePageLoaded');
    }

    function checkForEmptyData(data) {
        if (data.length === 0) {
        	$scope.resultMessage = NO_RESULTS_MESSAGE;
        } else {
            $scope.resultMessage = '';
        }
    }
});