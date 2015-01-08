app.controller('EditUserProfileController', function ($scope, $rootScope, $routeParams, $location,
                                             $townsData, $categoriesData, $adsData, $notifications) {
    editUserProfilePageLoaded();

    $scope.updatedUserProfileData = {
        username: 'maria',
        name: 'Maria',
        email: 'asdf@abv.bg',
        phone: '0855247145',
        town: '1'
    };

    $scope.updatedUserPassword = {
        oldPassword: 'maria',
        newPassword: 'Maria',
        confirmPassword: 'asdf@abv.bg'
    };

    $townsData.getAll().then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    // Private functions
    function editUserProfilePageLoaded() {
        $rootScope.$broadcast('editUserProfilePageLoaded');
    }
});