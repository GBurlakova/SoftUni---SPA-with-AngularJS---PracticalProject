app.controller('RegisterController', function ($scope, $rootScope, $townsData, $usersData) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api';
    // var baseUrl = 'http://localhost:1337/api';
    var USER_REGISTERED_SUCCESSFULLY = 'Successfully created user profile';

    $scope.registerData = {
        username: 'maria',
        password: '123',
        confirmPassword: '123',
        name: 'Maria',
        email: 'asdf@abv.bg',
        phone: '0855247145',
        town: '1'
    };

    loadRegisterPage();

    $townsData.getAll(baseUrl).then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    $scope.registerUser = function (registerData) {
        $usersData.register(baseUrl, registerData)
            .then(function (data, status, headers, config) {
                showSuccessMessage(USER_REGISTERED_SUCCESSFULLY);
                console.log(data);
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
            function (error, status, headers, config) {
                console.log(error);
            });
    };

    function loadRegisterPage() {
        $rootScope.$broadcast('registerPageLoaded');
    }

    function logUser() {
        $rootScope.$broadcast('userLogged');
    }

    function showSuccessMessage(msg) {
        noty({
                text: msg,
                type: 'success',
                layout: 'topCenter',
                timeout: 2000}
        );
    }
});