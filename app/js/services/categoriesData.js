app.factory('$categoriesData', function ($requester, BASE_URL) {
    var getAll = function () {
        var serviceUrl = BASE_URL + '/categories';
        return $requester.get(serviceUrl, null);
    };

    return {
        getAll: getAll
    }
});