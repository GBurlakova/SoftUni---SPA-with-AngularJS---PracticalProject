app.controller('CategoriesController', function CategoriesController($scope, $rootScope, $categoriesData) {
    var BASE_URL = 'http://softuni-ads.azurewebsites.net/api';
    // var BASE_URL = 'http://localhost:1337/api';
    var ACTIVE_CATEGORY_CLASS = 'active';
    var currentCategorySelected = 'all';

    $categoriesData.getAll(BASE_URL).then(
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    $scope.categoryClicked = function (categoryClicked) {
        currentCategorySelected = categoryClicked;
        $rootScope.$broadcast('categoryFilterSelected', categoryClicked);
    };

    $scope.getClass = function (categoryId) {
        if (categoryId === currentCategorySelected) {
        	return ACTIVE_CATEGORY_CLASS;
        } else {
        	return '';
        }
    }
});