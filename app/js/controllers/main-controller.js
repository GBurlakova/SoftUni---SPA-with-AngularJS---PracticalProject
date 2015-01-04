app.controller('MainController', function ($scope, $usersData, $location, permissions) {
    var userIsLogged;

    $scope.$on('$routeChangeStart', function(scope, next, current) {
        var permission = next.$$route.permission;
        var unauthorized = !permissions.hasPermission(permission) || (permission !== $usersData.getUserData()['permission']);
        if(unauthorized){
            $location.path('/');
            $usersData.clearUserData();
        }

        userIsLogged = $usersData.getUserData()['username'];
        if (userIsLogged) {
            var username = $usersData.getUserData()['username'];
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

    var headerTemplates = {
        headerPublic: 'templates/partials/header-public.html',
        headerUser: 'templates/partials/header-user.html',
        headerAdmin: 'templates/partials/header-admin.html'
    };

    var headerTitle = {
        // public
        home: 'Home',
        login: 'Login',
        register: 'Register'
    };

    $scope.$on('registerPageLoaded', function () {
        $scope.title = headerTitle.register;
    });

    $scope.$on('loginPageLoaded', function () {
        $scope.title = headerTitle.login;
    });

    $scope.$on('homePageLoaded', function () {
        $scope.title = headerTitle.home;
    });

    $scope.$on('userLogged', function () {
        $scope.template = {
            url: headerTemplates.headerUser
        };
        var username = $usersData.getUserData()['username'];
        $scope.username = username;
    });

    $scope.setHeaderStyle = function () {
        var userIsAdmin = $usersData.getUserData()['permission'] === 'admin';
        var headerStyle = '';
        if (userIsAdmin) {
        	headerStyle = 'admin-header';
        }

        return headerStyle;
    };
});