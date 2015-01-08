app.controller('CategoriesController', function CategoriesController($scope, $rootScope, categoriesData) {
    var ACTIVE_CATEGORY_CLASS = 'active';
    var currentCategorySelected = 'all';

    categoriesData.getAll().then(
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    // Scope functions
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