app.controller('CategoriesController', function CategoriesController($scope, $rootScope, $categoriesData) {
    // var baseUrl = 'http://softuni-ads.azurewebsites.net/api';
    var baseUrl = 'http://localhost:1337/api';
    var currentCategorySelected = 'all';

    $categoriesData.getAll(baseUrl).then(
        function (data, status, headers, config) {
            $scope.categories = data;
            console.log(data);
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    $scope.categoryClicked = function (categorySelected) {
        currentCategorySelected = categorySelected;
        $rootScope.$broadcast('categoryFilterSelected', categorySelected);
    };

    $scope.getClass = function (categoryId) {
        if (categoryId === currentCategorySelected) {
        	return 'active';
        } else {
        	return '';
        }
    }
});