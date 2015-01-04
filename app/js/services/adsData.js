app.factory('$adsData', function ($requester) {
    var get = function (baseUrl, urlParams){
        var serviceUrl = baseUrl + '/ads?townid=' + urlParams.townId +
            '&categoryid=' + urlParams.categoryId +
            '&startPage=' + urlParams.startPage +
            '&pageSize=' + urlParams.pageSize;
        return $requester.get(serviceUrl, null);
    };

    var getById = function (baseUrl, adId) {
        var serviceUrl = baseUrl + '/ads/' + adId;
        return $requester.get(serviceUrl, null);
    };

    return {
        get: get,
        getById: getById
    }
});