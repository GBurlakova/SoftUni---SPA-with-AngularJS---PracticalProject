app.factory('usersData', function (requester, BASE_URL) {
    var register = function (registerData) {
        var serviceUrl = BASE_URL + '/user/register';
        return requester.post(serviceUrl, null, registerData);
    };

    var login = function (loginData) {
        var serviceUrl = BASE_URL + '/user/login';
        return requester.post(serviceUrl, null, loginData);
    };

    var isAdmin = function () {
        var userLoggedPermission = localStorage.getItem('permission');
        var userIsAdmin = false;
        if (userLoggedPermission == 'admin') {
            userIsAdmin = true;
        }

        return userIsAdmin;
    };

    var hasUserLogged = function () {
        var accessToken = localStorage.getItem('accessToken');
        var hasUserLogged = false;
        if (accessToken) {
        	hasUserLogged = true;
        }

        return hasUserLogged;
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

    var getProfile = function () {
        var serviceUrl = BASE_URL + '/user/profile';
        var authorizationHeader = getAuthorizationHeader();
        return requester.get(serviceUrl, authorizationHeader, null);
    };

    var editProfile = function (updatedUserProfileData) {
        var serviceUrl = BASE_URL + '/user/profile';
        var authorizationHeader = getAuthorizationHeader();
        return requester.put(serviceUrl, authorizationHeader, updatedUserProfileData);
    };

    var changePassword = function (updatedUserPasswordData) {
        var serviceUrl = BASE_URL + '/user/changepassword';
        var authorizationHeader = getAuthorizationHeader();
        return requester.put(serviceUrl, authorizationHeader, updatedUserPasswordData);
    };

    return{
        register: register,
        login: login,
        isAdmin: isAdmin,
        hasUserLogged: hasUserLogged,
        saveUserData: saveUserData,
        clearUserData: clearUserData,
        getUserData: getUserData,
        getAuthorizationHeader: getAuthorizationHeader,
        getProfile: getProfile,
        editProfile: editProfile,
        changePassword: changePassword
    }
});