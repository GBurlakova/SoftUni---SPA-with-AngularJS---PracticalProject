app.controller('RegisterController', function ($scope, $rootScope, $location, townsData, usersData, notifications) {
    var USER_REGISTERED_SUCCESSFULLY = 'Successfully created user profile';
    var REGISTER_USER_CONFIRM_MESSAGE = 'Would you like to create a user profile?';
    var EMAIL_IS_TAKEN_PATTERN = '^Email (.+) is already taken.$';
    var USERNAME_IS_TAKEN_PATTERN = '^Name (.+) is already taken.$';

    var emailRegex = new RegExp(EMAIL_IS_TAKEN_PATTERN);
    var usernameRegex = new RegExp(USERNAME_IS_TAKEN_PATTERN);

    $scope.emailIsTaken = false;
    $scope.usernameIsTaken = false;

    $scope.registerData = {
        username: 'maria',
        password: '123',
        confirmPassword: '123',
        name: 'Maria',
        email: 'asdf@abv.bg',
        phone: '0855247145',
        townId: ''
    };

    registerPageLoaded();

    townsData.getAll().then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    // Scope functions
    $scope.registerUser = function (registerData) {
        notifications.confirm(REGISTER_USER_CONFIRM_MESSAGE)
            .then(
                function () {
                    executeRegisterUser(registerData);
            });
    };

    // Private functions
    function executeRegisterUser(registerData) {
        usersData.register(registerData)
            .then(function (data, status, headers, config) {
                saveUserData(data);
                notifications.success(USER_REGISTERED_SUCCESSFULLY)
                    .then(
                        function () {
                            $location.path("/user/home");
                            userLogged();
                    });
            },
            function (error, status, headers, config) {
                processRegisterError(error);
            });
    }

    function saveUserData(data) {
        var username = data['username'];
        var accessToken = data['access_token'];
        var permission;
        if (data.hasOwnProperty('isAdmin')) {
            permission = 'admin';
        }else {
            permission = 'user';
        }
        usersData.saveUserData(username, accessToken, permission);
    }

    function processRegisterError(error) {
        var errorModelState = error.modelState[""];
        console.log(errorModelState);
        for (var i = 0; i < errorModelState.length; i++) {
            var errorMessage = errorModelState[i];
            var emailTaken = emailRegex.test(errorMessage);
            var usernameTaken = usernameRegex.test(errorMessage);
            if (emailTaken) {
                $scope.emailIsTaken = true;
            }

            if (usernameTaken) {
                $scope.usernameIsTaken  = true;
            }
        }
    }

    function registerPageLoaded() {
        $rootScope.$broadcast('registerPageLoaded');
    }

    function userLogged() {
        $rootScope.$broadcast('userLogged');
    }
});