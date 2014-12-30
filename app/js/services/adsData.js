app.factory('$adsData', function ($requester) {
    var getAll = function (baseUrl) {
        var serviceUrl = baseUrl + '/ads';
        return $requester.get(serviceUrl, null);
    };

    var getWithFilter = function (baseUrl, townIdFilter, categoryIdFilter){
        var serviceUrl = baseUrl + '/ads?townid=' + townIdFilter + '&categoryid=' + categoryIdFilter;
        return $requester.get(serviceUrl, null);
    };

    var getById = function (baseUrl, adId) {
        var serviceUrl = baseUrl + '/ads/' + adId;
        return $requester.get(serviceUrl, null);
    };

    return {
        getAll: getAll,
        getWithFilter: getWithFilter,
        getById: getById
    }
});