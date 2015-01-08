app.controller('RegisterController', function ($scope, $rootScope, $location, townsData, usersData) {
    var USER_REGISTERED_SUCCESSFULLY = 'Successfully created user profile';
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
        console.log(registerData);
        usersData.register(registerData)
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
                usersData.saveUserData(username,accessToken, isAdmin);
                setTimeout(function () {
                    $location.path("#/user/home");
                    logUser();
                }, 4000);
            },
            function (error, status, headers, config) {
                console.log(error);
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
            });
    };

    // Private functions
    function registerPageLoaded() {
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