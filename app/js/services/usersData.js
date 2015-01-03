app.factory('$usersData', function ($requester) {
    var register = function (baseUrl, registerData) {
        var serviceUrl = baseUrl + '/user/register';
        return $requester.post(serviceUrl, null, registerData);
    };

    var login = function (baseUrl, loginData) {
        var serviceUrl = baseUrl + '/user/login';
        return $requester.post(serviceUrl, null, loginData);
    };

    var saveUserData = function (username, accessToken, isAdmin) {
        localStorage.clear();
        localStorage.setItem('username', username);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('isAdmin', isAdmin);
    };

    var getUserData = function () {
        var userData = {
            username: localStorage.getItem('username'),
            accessToken: localStorage.getItem('accessToken'),
            isAdmin: localStorage.getItem('isAdmin')
        };

        return userData;
    };

    return{
        register: register,
        login: login,
        saveUserData: saveUserData,
        getUserData: getUserData
    }
});