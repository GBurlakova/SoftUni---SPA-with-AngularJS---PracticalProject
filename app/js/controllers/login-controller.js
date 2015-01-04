app.controller('LoginController', function ($scope, $rootScope,  $usersData, $notifications) {
    var BASE_URL = 'http://softuni-ads.azurewebsites.net/api';
    // var BASE_URL = 'http://localhost:1337/api';

    $scope.loginData = {
        username: 'gaby',
        password: '123'
    };

    loginPageLoaded();

    $scope.login = function (loginData) {
        $usersData.login(BASE_URL, loginData)
            .then(
                function (data) {
                    var username = data['username'];
                    var accessToken = data['access_token'];
                    var permission;
                    if (data.hasOwnProperty('isAdmin')) {
                        permission = 'admin';
                        window.location.href = "#/admin/home";
                    }else {
                        permission = 'user';
                        window.location.href = "#/user/home";
                    }
                    $usersData.saveUserData(username, accessToken, permission);
                    //userLogged();
                },
                function (error) {
                    console.log(error);
                });
    };

    // Private functions
    function loginPageLoaded() {
        $rootScope.$broadcast('loginPageLoaded');
    }

    function userLogged() {
        $rootScope.$broadcast('userLogged');
    }
});