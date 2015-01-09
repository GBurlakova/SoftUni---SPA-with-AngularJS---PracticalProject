app.factory('adsData', function (requester, usersData, BASE_URL) {
    // Public ads
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

    // USer ads
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

    // Admin ads
    var getAdminAds = function (adId) {
        var serviceUrl = BASE_URL + '/admin/ads/';
        var authenticationHeader = usersData.getAuthorizationHeader();
        return requester.get(serviceUrl, authenticationHeader, null);
    };

    var approveAd = function (adId) {
        var serviceUrl = BASE_URL + '/admin/ads/approve/' + adId;
        var authenticationHeader = usersData.getAuthorizationHeader();
        return requester.put(serviceUrl, authenticationHeader, null);
    };

    var rejectAd = function (adId) {
        var serviceUrl = BASE_URL + '/admin/ads/reject/' + adId;
        var authenticationHeader = usersData.getAuthorizationHeader();
        return requester.put(serviceUrl, authenticationHeader, null);
    };

    return {
        // public ads
        get: get,
        getById: getById,
        // user ads
        getUsersAds: getUserAds,
        getUserAdById: getUserAdById,
        editUserAd: editUserAd,
        // admin ads
        getAdminAds: getAdminAds,
        approveAd: approveAd,
        rejectAd: rejectAd
    }
});