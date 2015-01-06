app.factory('$adsData', function ($requester, $usersData, BASE_URL) {
    var get = function (urlParams){
        var serviceUrl = BASE_URL + '/ads?townid=' + urlParams.townId +
            '&categoryid=' + urlParams.categoryId +
            '&startPage=' + urlParams.startPage +
            '&pageSize=' + urlParams.pageSize;
        return $requester.get(serviceUrl, null);
    };

    var getById = function (adId) {
        var serviceUrl = BASE_URL + '/ads/' + adId;
        return $requester.get(serviceUrl, null);
    };

    var getUserAds = function (urlParams) {
        var serviceUrl = BASE_URL + '/user/ads?status=' + urlParams.status +
            '&startPage=' + urlParams.startPage +
            '&pageSize=' + urlParams.pageSize;
        var authenticationHeader = $usersData.getAuthorizationHeader();
        return $requester.get(serviceUrl, authenticationHeader);
    };

    return {
        get: get,
        getById: getById,
        getUsersAds: getUserAds
    }
});