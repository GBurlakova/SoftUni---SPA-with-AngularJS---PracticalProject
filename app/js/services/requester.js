app.factory('requester', function ($q, $http) {
    var makeRequest = function (method, url, headers, data) {
        var deferred = $q.defer();

        $http({
            method: method,
            url: url,
            headers: headers,
            data: data
        })
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    };

    var makeGetRequest = function (url, headers) {
        return makeRequest('GET', url, headers, null);
    };

    var makePostRequest = function (url, headers, data) {
        return makeRequest('POST', url, headers, data);
    };

    var makePutRequest = function (url, headers, data) {
        return makeRequest('PUT', url, headers, data);
    };

    var makeDeleteRequest = function (url, headers) {
        return makeRequest('DELETE', url, headers, null);
    };

    return {
        get: makeGetRequest,
        post: makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
});