app.factory('$requester', function ($q, $http) {
    return function (method, url, headers, data) {

        var makeRequest = function (method, url, headers, data) {
            var deferred = $q.defer();

            $http({
                method: method,
                url: url,
                headers: headers,
                data: data
            })
            .success(deferred.resolve)
            .error(deferred.reject)

            return deferred.promise;
        }
        
        var makeGetRequest = function (url, headers) {
            return makeRequest('GET', url, headers, null);
        }

        return {
            get: makeGetRequest
        }
    }
})