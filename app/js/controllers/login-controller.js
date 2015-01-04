app.controller('LoginController', function ($scope, $rootScope,  $usersData) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api';
    // var baseUrl = 'http://localhost:1337/api';

    $scope.loginData = {
        username: 'maria',
        password: '123'
    };

    $scope.login = function (loginData) {
        $usersData.login(baseUrl, loginData)
            .then(
                function (data) {
                    var username = data['username'];
                    var accessToken = data['access_token'];
                    var permission;
                    if (data.hasOwnProperty('isAdmin')) {
                        permission = 'admin';
                    }else {
                        permission = 'user';
                    }
                    $usersData.saveUserData(username, accessToken, permission);
                    window.location.href = "#/user/home";
                    logUser();
                },
                function (error) {
                    console.log(error);
                });
    };

    loadLoginPage();

    function loadLoginPage() {
        $rootScope.$broadcast('loginPageLoaded');
    }

    function logUser() {
        $rootScope.$broadcast('userLogged');
    }
});