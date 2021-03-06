app.controller('MainController', function ($scope, usersData, $location, permissions, notifications) {
    var ADMIN_HEADER_CLASS = 'admin-header';
    var USER_HEADER_CLASS = 'user-header';
    var UNAUTHORIZED_ACCESS_MESSAGE = 'You do no have the permission needed to access this page.' +
        'Please login and try again!';
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
        editUserProfile: 'Edit Profile',
        // admin
        adminAds: 'Ads administration',
        adminDeleteAd: 'Delete Ad',
        adminEditAd: 'Edit ad',
        users: 'Users',
        categories: 'Categories',
        editCategory: 'Edit Category',
        deleteCategory: 'Delete Category',
        createCategory: 'Create Category',
        towns: 'Towns',
        editTown: 'Edit Town',
        deleteTown: 'Delete Town',
        createTown: 'Create Town'
    };

    $scope.notSpecifiedTextData = 'Not specified';

    // Events
    $scope.$on('$routeChangeStart', function(scope, next) {
        authorizeUserAccess(next);
        userIsLogged = usersData.hasUserLogged();
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

    $scope.$on('allUsersPageLoaded', function () {
        $scope.title = headerTitle.users;
    });

    $scope.$on('adminAdsPageLoaded', function () {
        $scope.title = headerTitle.adminAds;
    });

    $scope.$on('allCategoriesPageLoaded', function () {
        $scope.title = headerTitle.categories;
    });

    $scope.$on('createCategoryPageLoaded', function () {
        $scope.title = headerTitle.createCategory;
    });

    $scope.$on('deleteCategoryPageLoaded', function () {
        $scope.title = headerTitle.deleteCategory;
    });

    $scope.$on('editCategoryPageLoaded', function () {
        $scope.title = headerTitle.editCategory;
    });

    $scope.$on('allTownsPageLoaded', function () {
        $scope.title = headerTitle.towns;
    });

    $scope.$on('createTownPageLoaded', function () {
        $scope.title = headerTitle.createTown;
    });

    $scope.$on('deleteTownPageLoaded', function () {
        $scope.title = headerTitle.deleteTown;
    });

    $scope.$on('editTownPageLoaded', function () {
        $scope.title = headerTitle.editTown;
    });

    // Scope functions
    $scope.setHeaderStyle = function () {
        var userIsAdmin = usersData.isAdmin();
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

    // Private functions
    function authorizeUserAccess(next) {
        var permission = next.$$route.permission;
        if (permission !== undefined) {
            var unknownPermission = !permissions.hasPermission(permission);
            var forbiddenAccess = (permission !== usersData.getUserData()['permission']);
            var isUnauthorizedAccess =  unknownPermission || forbiddenAccess;
            if(isUnauthorizedAccess){
                usersData.clearUserData();
                $location.path('/unauthorized');
            }
        }
    }
});