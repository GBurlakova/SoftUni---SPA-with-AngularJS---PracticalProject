app.factory('$ads', function ($requester) {
    return function (baseUrl, $requester) {
        var serviceUrl = baseUrl + '/ads';

        var getAll = function () {
            return $requester.get(serviceUrl, headers);
        }

        return {
            getAll: getAll
        }
    }
});