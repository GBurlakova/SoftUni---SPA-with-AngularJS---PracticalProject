app.factory('$adsData', function ($requester, $usersData) {
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

    var getUserAds = function (baseUrl, urlParams) {
        var serviceUrl = baseUrl + '/user/ads?status=' + urlParams.status +
            '&startPage=' + urlParams.startPage +
            '&pageSize=' + urlParams.pageSize;
        var authenticationData = {
            Authorization: 'Bearer ' + $usersData.getUserData()['accessToken']
        };

        return $requester.get(serviceUrl, authenticationData);
    };

    return {
        get: get,
        getById: getById,
        getUsersAds: getUserAds
    }
});