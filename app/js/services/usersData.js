app.factory('$usersData', function ($requester) {
    var register = function (baseUrl, registerData) {
        var serviceUrl = baseUrl + '/user/register';
        return $requester.post(serviceUrl, null, registerData);
    };

    var login = function (baseUrl, loginData) {
        var serviceUrl = baseUrl + '/user/login';
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

    return{
        register: register,
        login: login,
        saveUserData: saveUserData,
        clearUserData: clearUserData,
        getUserData: getUserData
    }
});