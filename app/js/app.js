var app = angular.module('adsApp', ['ngRoute', 'angular-loading-bar', 'ui.bootstrap.pagination']);

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
    $routeProvider.when('/unauthorized', {
        templateUrl: 'templates/public-screens/unauthorized.html',
        controller: '',
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
        controller: 'UserEditAdController',
        permission: 'user'
    });
    $routeProvider.when('/user/ads/delete/:id', {
        templateUrl: 'templates/user-screens/delete-ad.html',
        controller: '',
        permission: 'user'
    });
    $routeProvider.when('/user/profile', {
        templateUrl: 'templates/user-screens/edit-user-profile.html',
        controller: '',
        permission: 'user'
    });
    // admin screens
    $routeProvider.when('/admin/ads', {
        templateUrl: 'templates/admin-screens/admin-ads.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.when('/admin/ads/delete/:id', {
        templateUrl: 'templates/admin-screens/admin-delete-ad.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.when('/admin/ads/edit/:id', {
        templateUrl: 'templates/admin-screens/admin-edit-ad.html',
        controller: 'AdminEditAdController',
        permission: 'admin'
    });
    $routeProvider.when('/admin/users', {
        templateUrl: 'templates/admin-screens/users.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.when('/admin/users/delete/:username', {
        templateUrl: 'templates/admin-screens/delete-user.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.when('/admin/categories', {
        templateUrl: 'templates/admin-screens/categories.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.when('/admin/towns', {
        templateUrl: 'templates/admin-screens/towns.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.when('/admin/categories/create', {
        templateUrl: 'templates/admin-screens/new-category.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.when('/admin/towns/create', {
        templateUrl: 'templates/admin-screens/new-town.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.when('/admin/categories/delete/:id/:name', {
        templateUrl: 'templates/admin-screens/delete-category.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.when('/admin/towns/delete/:id/:name', {
        templateUrl: 'templates/admin-screens/delete-town.html',
        controller: '',
        permission: 'admin'
    });
    $routeProvider.otherwise({redirectTo: '/'});
});

app.constant('BASE_URL', 'http://softuni-ads.azurewebsites.net/api');

app.run(function($location, permissions, usersData) {
    permissions.setPermissions(permissionList);
    if (usersData.hasUserLogged()) {
    	if (usersData.isAdmin()) {
    		$location.path('/admin/ads');
    	} else {
            $location.path('/user/home');
    	}
    } else {
        $location.path('/');
        usersData.clearUserData();
    }
});