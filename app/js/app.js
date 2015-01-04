var app = angular.module('adsApp', ['ngRoute']);

var permissionList = [
    'guest',
    'user',
    'admin'
];

app.config(function ($routeProvider) {
    // public screens
    $routeProvider.when('/', {
        templateUrl: 'templates/public-screens/home.html',
        permission: 'guest'
    });
    $routeProvider.when('/login', {
        templateUrl: 'templates/public-screens/login.html',
        permission: 'guest'
    });
    $routeProvider.when('/register', {
        templateUrl: 'templates/public-screens/register.html',
        permission: 'guest'
    });

    // user screens
    $routeProvider.when('/user/home', {
        templateUrl: 'templates/user-screens/user-home.html',
        controller: '',
        permission: 'user'
    });
});

app.run(function($permissions) {
    $permissions.setPermissions(permissionList);
});