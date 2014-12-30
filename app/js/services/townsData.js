app.factory('$townsData', function ($requester) {
    var getAll = function (baseUrl) {
        var serviceUrl = baseUrl + '/towns';
        return $requester.get(serviceUrl, null);
    };

    return {
        getAll: getAll
    }
});