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

    // User ads
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

    var publishAd = function (newAdData) {
        var serviceUrl = BASE_URL + '/user/ads';
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.post(serviceUrl, authorizationHeader, newAdData);
    };

    var deactivateAd = function (adId) {
        var serviceUrl = BASE_URL + '/user/ads/deactivate/' + adId;
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.put(serviceUrl, authorizationHeader, null);
    };

    var publishAdAgain = function (adId) {
        var serviceUrl = BASE_URL + '/user/ads/publishagain/' + adId;
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.put(serviceUrl, authorizationHeader, null);
    };

    var deleteAd = function (adId) {
        var serviceUrl = BASE_URL + '/user/ads/' + adId;
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.delete(serviceUrl, authorizationHeader, null);
    };

    // Admin ads
    var getAdminAds = function (urlParams) {
        var serviceUrl = BASE_URL + '/admin/ads?status=' + urlParams.status +
            '&categoryid=' + urlParams.categoryId +
            '&townid=' + urlParams.townId +
            '&sortby=' + urlParams.sortBy +
            '&startPage=' + urlParams.startPage +
            '&pageSize=' + urlParams.pageSize;
        var authenticationHeader = usersData.getAuthorizationHeader();
        return requester.get(serviceUrl, authenticationHeader, null);
    };

    var getAdminAdById = function (adId) {
        var serviceUrl = BASE_URL + '/admin/ads/' + adId;
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

    var deleteAdminAd = function (adId) {
        var serviceUrl = BASE_URL + '/admin/ads/' + adId;
        var authenticationHeader = usersData.getAuthorizationHeader();
        return requester.delete(serviceUrl, authenticationHeader, null);
    };

    return {
        // public ads
        get: get,
        getById: getById,
        // user ads
        getUsersAds: getUserAds,
        getUserAdById: getUserAdById,
        editUserAd: editUserAd,
        publish: publishAd,
        deactivateAd: deactivateAd,
        publishAdAgain: publishAdAgain,
        deleteAd: deleteAd,
        // admin ads
        getAdminAds: getAdminAds,
        getAdminAdById: getAdminAdById,
        approveAd: approveAd,
        rejectAd: rejectAd,
        deleteAdminAd: deleteAdminAd
    }
});