app.controller('HeaderController', function ($scope) {
    var headerTemplates = {
        headerPublic: 'templates/partials/header-public.html',
        headerUser: 'templates/partials/header-user.html',
        headerAdmin: 'templates/partials/header-admin.html'
    };

    var headerTitles = {
        // public
        home: 'Home',
        login: 'Login',
        register: 'Register'
    };

    $scope.template = {
        url: headerTemplates.headerPublic
    };

    $scope.title = headerTitles.home;
});