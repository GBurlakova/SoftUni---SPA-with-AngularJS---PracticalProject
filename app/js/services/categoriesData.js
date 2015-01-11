app.factory('categoriesData', function (requester, BASE_URL, usersData) {
    var getAll = function () {
        var serviceUrl = BASE_URL + '/categories';
        return requester.get(serviceUrl, null);
    };

    var getAdminCategories = function (urlParams) {
        var serviceUrl = BASE_URL + '/admin/categories?sortBy=' + urlParams.sortBy +
            '&startPage=' + urlParams.startPage +
            '&pageSize=' + urlParams.pageSize;
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.get(serviceUrl, authorizationHeader, null);
    };

    var createCategory = function (category) {
        var serviceUrl = BASE_URL + '/admin/categories';
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.post(serviceUrl, authorizationHeader, category);
    };

    var deleteCategory = function (categoryId) {
        var serviceUrl = BASE_URL + '/admin/categories/' + categoryId;
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.delete(serviceUrl, authorizationHeader);
    };

    var editCategory = function (categoryId, category) {
        var serviceUrl = BASE_URL + '/admin/categories/' + categoryId;
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.put(serviceUrl, authorizationHeader, category);
    };

    return {
        getAll: getAll,
        getAdminCategories: getAdminCategories,
        createCategory: createCategory,
        deleteCategory: deleteCategory,
        editCategory: editCategory
    }
});