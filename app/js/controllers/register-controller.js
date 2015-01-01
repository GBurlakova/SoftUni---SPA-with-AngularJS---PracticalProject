app.controller('RegisterController', function ($scope, $townsData, $usersData) {
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
            },
            function (error, status, headers, config) {
                console.log(error);
            });
    };

    function showSuccessMessage(msg) {
        noty({
                text: msg,
                type: 'success',
                layout: 'topCenter',
                timeout: 2000}
        );
    }
});