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
                    var isAdmin;
                    if (data.hasOwnProperty('isAdmin')) {
                        isAdmin = data['isAdmin'];
                    }else {
                        isAdmin = false;
                    }
                    $usersData.saveUserData(username,accessToken, isAdmin);
                    setTimeout(function () {
                        window.location.href = "#/";
                        logUser();
                    }, 4000);
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