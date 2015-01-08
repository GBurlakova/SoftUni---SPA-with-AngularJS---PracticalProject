app.factory('townsData', function (requester, BASE_URL) {
    var getAll = function () {
        var serviceUrl = BASE_URL + '/towns';
        return requester.get(serviceUrl, null);
    };

    return {
        getAll: getAll
    }
});