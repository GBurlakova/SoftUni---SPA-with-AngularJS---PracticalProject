app.factory('adsData', function (requester, usersData, BASE_URL) {
    var get = function (urlParams){
        var serviceUrl = BASE_URL + '/ads?townid=' + urlParams.townId +
            '&categoryid=' + urlParams.categoryId +
            '&startPage=' + urlParams.startPage +
            '&pageSize=' + urlParams.pageSize;
        return requester.get(serviceUrl, null);
    };

    var getById = function (adId) {
        var serviceUrl = BASE_URL + '/ads/' + adId;
        return requester.get(serviceUrl, null);
    };

    var getUserAds = function (urlParams) {
        var serviceUrl = BASE_URL + '/user/ads?status=' + urlParams.status +
            '&startPage=' + urlParams.startPage +
            '&pageSize=' + urlParams.pageSize;
        var authenticationHeader = usersData.getAuthorizationHeader();
        return requester.get(serviceUrl, authenticationHeader);
    };

    var getUserAdById = function (adId) {
        var serviceUrl = BASE_URL + '/user/ads/' + adId;
        var authenticationHeader = usersData.getAuthorizationHeader();
        return requester.get(serviceUrl, authenticationHeader);
    };

    var editUserAd = function (adId, editedAdData) {
        var serviceUrl = BASE_URL + '/user/ads/' + adId;
        var authenticationHeader = usersData.getAuthorizationHeader();
        return requester.put(serviceUrl, authenticationHeader, editedAdData);
    };

    return {
        get: get,
        getById: getById,
        getUsersAds: getUserAds,
        getUserAdById: getUserAdById,
        editUserAd: editUserAd
    }
});