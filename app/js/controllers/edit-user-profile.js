app.controller('EditUserProfileController', function ($scope, $rootScope, $routeParams, $location,
                                             $townsData, usersData, $adsData, $notifications) {
    var USER_PROFILE_SUCCESSSFULLY_EDITED_MESSAGE = 'User profile successfully updated.';
    var USER_PROFILE_CANNOT_BE_EDITED_MESSAGE = 'User profile cannot be edited. PLease try again later!';
    var USER_PASSWORD_SUCCESSFULLY_EDITED_MESSAGE = 'User password successfully updated';
    var USER_PASSWORD_CANNOT_BE_EDITED_MESSAGE = 'User profile cannot be edited. Please try again later!';
    var INVALID_PASSWORD_PATTERN = '^Incorrect password.$';
    var invalidPasswordRegex = new RegExp(INVALID_PASSWORD_PATTERN);

    editUserProfilePageLoaded();

    $scope.editedUserProfileData = {
        name: 'Maria',
        email: 'asdf@abv.bg',
        phoneNumber: '0855247145',
        townId: '1'
    };

    $scope.editedUserPassword = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    };


    $scope.isInvalidPassword = false;

    $scope.emailIsTaken = false;

    usersData.getProfile().then(function (data) {
            $scope.editedUserProfileData.name = data.name;
            $scope.editedUserProfileData.email = data.email;
            $scope.editedUserProfileData.phoneNumber = data.phoneNumber;
            $scope.editedUserProfileData.townId = data.townId;
            console.log(data);
        }, function (error) {

        });

    $townsData.getAll().then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    $scope.cancel = function () {
        $location.path('/user/ads');
    };

    $scope.editUserProfile = function (editedUserProfileData) {
        usersData.editProfile(editedUserProfileData).then(function () {
            $notifications.success(USER_PROFILE_SUCCESSSFULLY_EDITED_MESSAGE);
        }, function () {
            $notifications.error(USER_PROFILE_CANNOT_BE_EDITED_MESSAGE);
        })
    };

    $scope.editUserPassword = function (editedUserPassword) {
        console.log(editedUserPassword);
        usersData.changePassword(editedUserPassword).then(function () {
            $notifications.success(USER_PASSWORD_SUCCESSFULLY_EDITED_MESSAGE);
        }, function (error) {
            var errorMessage = error.modelState[""][0];
            var isInvalidPassword = invalidPasswordRegex.test(errorMessage);
            if (isInvalidPassword) {
                $scope.isInvalidPassword = true;
            }
        })
    };

    // Private functions
    function editUserProfilePageLoaded() {
        $rootScope.$broadcast('editUserProfilePageLoaded');
    }
});