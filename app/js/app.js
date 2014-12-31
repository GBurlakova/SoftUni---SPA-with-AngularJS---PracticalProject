var app = angular.module('adsApp', ['ngRoute'])
    .config(function ($routeProvider) {
        // public screens
        $routeProvider.when('/', {
            templateUrl: 'templates/public-screens/home.html'
        });
        $routeProvider.when('/login', {
            templateUrl: 'templates/public-screens/login.html'
            // controller: ''
        });
        $routeProvider.when('/register', {
            templateUrl: 'templates/public-screens/register.html',
            controller: ''
        });
        // user screens
        $routeProvider.when('/user/home', {
            templateUrl: 'templates/user-screens/user-home.html',
            controller: ''
        });
    });