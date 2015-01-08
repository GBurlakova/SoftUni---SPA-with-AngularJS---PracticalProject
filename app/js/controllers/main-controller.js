app.controller('MainController', function ($scope, usersData, $location, $permissions) {
    var ADMIN_HEADER_CLASS = 'admin-header';
    var USER_HEADER_CLASS = 'user-header';
    var userIsLogged;
    var headerTemplates = {
        headerPublic: 'templates/partials/header-public.html',
        headerUser: 'templates/partials/header-user.html'
    };

    var headerTitle = {
        // common
        home: 'Home',
        // public
        login: 'Login',
        register: 'Register',
        // user
        publishNewAd: 'Publish New Ad',
        myAds: 'My Ads',
        editAd: 'Edit Ad',
        deleteAd: 'Delete Ad',
        editUserProfile: 'Edit Profile'
    };

    $scope.$on('$routeChangeStart', function(scope, next) {
        authorizeUserAccess(next);
        userIsLogged = usersData.getUserData()['username'];
        if (userIsLogged) {
            var username = usersData.getUserData()['username'];
            $scope.username = username;
            $scope.template = {
                url: headerTemplates.headerUser
            };
        } else {
            $scope.template = {
                url: headerTemplates.headerPublic
            };
        }
    });

    $scope.$on('registerPageLoaded', function () {
        $scope.title = headerTitle.register;
    });

    $scope.$on('loginPageLoaded', function () {
        $scope.title = headerTitle.login;
    });

    $scope.$on('homePageLoaded', function () {
        $scope.title = headerTitle.home;
    });

    $scope.$on('publishNewAdPageLoaded', function () {
        $scope.title = headerTitle.publishNewAd;
    });

    $scope.$on('userAdsPageLoaded', function () {
        $scope.title = headerTitle.myAds;
    });

    $scope.$on('editAdPageLoaded', function () {
        $scope.title = headerTitle.editAd;
    });

    $scope.$on('deleteAdPageLoaded', function () {
        $scope.title = headerTitle.deleteAd;
    });

    $scope.$on('editUserProfilePageLoaded', function () {
        $scope.title = headerTitle.editUserProfile;
    });

    $scope.setHeaderStyle = function () {
        var userIsAdmin = usersData.getUserData()['permission'] === 'admin';
        var headerStyle = '';
        if (userIsAdmin) {
        	headerStyle = ADMIN_HEADER_CLASS;
        } else {
        	headerStyle = USER_HEADER_CLASS;
        }

        return headerStyle;
    };

    $scope.logout = function () {
        $location.path('/');
        usersData.clearUserData();
    };

    function authorizeUserAccess(next) {
        var permission = next.$$route.permission;
        var unknownPermission = !$permissions.hasPermission(permission);
        var forbiddenAccess = (permission !== usersData.getUserData()['permission']);
        var isUnauthorizedAccess =  unknownPermission || forbiddenAccess;
        if(isUnauthorizedAccess){
            $location.path('/');
            usersData.clearUserData();
        }
    }
});