app.factory('$categoriesData', function ($requester) {
    var getAll = function (baseUrl) {
        var serviceUrl = baseUrl + '/categories';
        return $requester.get(serviceUrl, null);
    };

    return {
        getAll: getAll
    }
});