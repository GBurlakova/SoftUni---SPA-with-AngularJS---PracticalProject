app.controller('EditCategoryController', function ($scope, $rootScope, $routeParams, $location,
                                                   categoriesData, notifications) {
    var CATEGORY_EDIT_CONFIRM_MESSAGE = 'Would you like to edit category';
    var CATEGORY_EDIT_SUCCESSFULLY_MESSAGE = 'Category edited successfully.';
    var CATEGORY_CANNOT_BE_EDITED_MESSAGE = 'Category cannot be edited at the moment. Please try again later!';
    var categoryToBeEditedId = $routeParams.id;
    var categoryName = $routeParams.name;

    $scope.category = {
        name: categoryName
    };

    editCategoryPageLoaded();

    $scope.editTown = function () {
        notifications.confirm(CATEGORY_EDIT_CONFIRM_MESSAGE).then(function () {
            executeEditCategory();
        });
    };

    // Private function
    function editCategoryPageLoaded() {
        $rootScope.$broadcast('editCategoryPageLoaded')
    }

    function executeEditCategory() {
        categoriesData.editTown(categoryToBeEditedId)
            .then(
            function () {
                notifications.success(CATEGORY_EDIT_SUCCESSFULLY_MESSAGE).then(function () {
                    $location.path('/admin/categories');
                });
            },
            function () {
                notifications.error(CATEGORY_CANNOT_BE_EDITED_MESSAGE);
            })
    }
});