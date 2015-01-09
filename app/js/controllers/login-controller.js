app.controller('LoginController', function ($scope, $rootScope,  $location, usersData, notifications) {
    var INVALID_LOGIN_DATA_MESSAGE = 'Username or password is incorrect. Please try again!';
    var INVALID_LOGIN_DATA_PATTERN = '^The user name or password is incorrect.$';
    var invalidLoginDataRegexp = new RegExp(INVALID_LOGIN_DATA_PATTERN);

    $scope.loginData = {
        username: 'gaby',
        password: '123'
    };

    loginPageLoaded();

    // Scope functions
    $scope.login = function (loginData) {
        usersData.login(loginData)
            .then(
                function (data) {
                    var username = data['username'];
                    var accessToken = data['access_token'];
                    var permission;
                    if (data.hasOwnProperty('isAdmin')) {
                        permission = 'admin';
                        $location.path("/admin/ads");
                    }else {
                        permission = 'user';
                        $location.path("/user/home");
                    }
                    usersData.saveUserData(username, accessToken, permission);
                },
                function (error) {
                    console.log(error);
                    var errorMessage = error.error_description;
                    var isInvalidLoginData = invalidLoginDataRegexp.test(errorMessage);
                    if (isInvalidLoginData) {
                    	notifications.error(INVALID_LOGIN_DATA_MESSAGE);
                    }
                });
    };

    // Private functions
    function loginPageLoaded() {
        $rootScope.$broadcast('loginPageLoaded');
    }
});