app.controller('HeaderController', function ($scope, $usersData) {
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

    var userIsLogged = $usersData.getUserData()['username'];
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