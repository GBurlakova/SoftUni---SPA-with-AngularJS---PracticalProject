var app = angular.module('adsApp', ['ngRoute', 'angular-loading-bar']);

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
    $routeProvider.when('/user/ads', {
        templateUrl: 'templates/user-screens/user-ads.html',
        controller: '',
        permission: 'user'
    });
    $routeProvider.when('/user/ads/publish', {
        templateUrl: 'templates/user-screens/publish-new-ad.html',
        controller: '',
        permission: 'user'
    });
    $routeProvider.when('/user/ads/edit/:id', {
        templateUrl: 'templates/user-screens/edit-ad.html',
        controller: '',
        permission: 'user'
    });
    // admin screens
    $routeProvider.when('/admin/home', {
        templateUrl: 'templates/admin-screens/admin-home.html',
        controller: '',
        permission: 'admin'
    });
});

app.constant('BASE_URL', 'http://softuni-ads.azurewebsites.net/api');

app.run(function($permissions) {
    $permissions.setPermissions(permissionList);
});