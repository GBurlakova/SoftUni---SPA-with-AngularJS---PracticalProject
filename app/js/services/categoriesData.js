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

    return {
        getAll: getAll,
        getAdminCategories: getAdminCategories
    }
});