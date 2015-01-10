app.controller('CreateCategoryController', function ($scope, $rootScope, $location,
                                               categoriesData, notifications) {
    var CATEGORY_CREATE_CONFIRM_MESSAGE = 'Would you like to create category';
    var CATEGORY_CREATED_SUCCESSFULLY_MESSAGE = 'Category created successfully.';
    var CATEGORY_CANNOT_BE_CREATED_MESSAGE = 'Category cannot be created at the moment. Please try again later!';

    createCategoryPageLoaded();

    $scope.category = {
        name: ''
    };

    $scope.createCategory = function () {
        notifications.confirm(CATEGORY_CREATE_CONFIRM_MESSAGE).then(function () {
            executeCreateCategory();
        });
    };

    // Private function
    function createCategoryPageLoaded() {
        $rootScope.$broadcast('createCategoryPageLoaded')
    }

    function executeCreateCategory() {
        categoriesData.createCategory($scope.category)
            .then(
            function () {
                notifications.success(CATEGORY_CREATED_SUCCESSFULLY_MESSAGE).then(function () {
                    $location.path('/admin/categories');
                });
            },
            function () {
                notifications.success(CATEGORY_CANNOT_BE_CREATED_MESSAGE);
            })
    }
});