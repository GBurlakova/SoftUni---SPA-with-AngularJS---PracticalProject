app.controller('DeleteCategoryController', function ($scope, $rootScope, $routeParams, $location,
                                                 categoriesData, notifications) {
    var CATEGORY_DELETE_CONFIRM_MESSAGE = 'Would you like to delete category';
    var CATEGORY_DELETE_SUCCESSFULLY_MESSAGE = 'Category deleted successfully.';
    var CATEGORY_CANNOT_BE_DELETED_MESSAGE = 'Category cannot be deleted at the moment. Please try again later!';
    var categoryToBeDeletedId = $routeParams.id;
    $scope.category = $routeParams.name;


    deleteCategoryPageLoaded();

    $scope.deleteCategory = function () {
        notifications.confirm(CATEGORY_DELETE_CONFIRM_MESSAGE).then(function () {
            executeDeleteCategory();
        });
    };

    // Private function
    function deleteCategoryPageLoaded() {
        $rootScope.$broadcast('deleteCategoryPageLoaded')
    }

    function executeDeleteCategory() {
        categoriesData.deleteCategory(categoryToBeDeletedId)
            .then(
            function () {
                notifications.success(CATEGORY_DELETE_SUCCESSFULLY_MESSAGE).then(function () {
                    $location.path('/admin/categories');
                });
            },
            function () {
                notifications.error(CATEGORY_CANNOT_BE_DELETED_MESSAGE);
            })
    }
});