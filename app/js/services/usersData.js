app.factory('$usersData', function ($requester, BASE_URL) {
    var register = function (registerData) {
        var serviceUrl = BASE_URL + '/user/register';
        return $requester.post(serviceUrl, null, registerData);
    };

    var login = function (loginData) {
        var serviceUrl = BASE_URL + '/user/login';
        return $requester.post(serviceUrl, null, loginData);
    };

    var saveUserData = function (username, accessToken, permission) {
        localStorage.clear();
        localStorage.setItem('username', username);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('permission', permission);
    };

    var clearUserData = function () {
        localStorage.clear();
        localStorage.setItem('permission', 'guest');
    };

    var getUserData = function () {
        var userData = {
            username: localStorage.getItem('username'),
            accessToken: localStorage.getItem('accessToken'),
            permission: localStorage.getItem('permission')
        };

        return userData;
    };

    var getAuthorizationHeader = function () {
        var authorizationHeader = { Authorization: 'Bearer ' + getUserData()['accessToken'] };
        return authorizationHeader;
    };

    var publishAd = function (newAdData) {
        var serviceUrl = BASE_URL + '/user/ads';
        var authorizationHeader = getAuthorizationHeader();
        return $requester.post(serviceUrl, authorizationHeader, newAdData);
    };

    var deactivateAd = function (adId) {
        var serviceUrl = BASE_URL + '/user/ads/deactivate/' + adId;
        var authorizationHeader = getAuthorizationHeader();
        return $requester.put(serviceUrl, authorizationHeader, null);
    };

    var publishAdAgain = function (adId) {
        var serviceUrl = BASE_URL + '/user/ads/publishagain/' + adId;
        var authorizationHeader = getAuthorizationHeader();
        return $requester.put(serviceUrl, authorizationHeader, null);
    };

    var deleteAd = function (adId) {
        var serviceUrl = BASE_URL + '/user/ads/' + adId;
        var authorizationHeader = getAuthorizationHeader();
        return $requester.delete(serviceUrl, authorizationHeader, null);
    };

    return{
        register: register,
        login: login,
        saveUserData: saveUserData,
        clearUserData: clearUserData,
        getUserData: getUserData,
        getAuthorizationHeader: getAuthorizationHeader,
        publish: publishAd,
        deactivateAd: deactivateAd,
        publishAdAgain: publishAdAgain,
        deleteAd: deleteAd
    }
});