app.controller('CategoriesController', function CategoriesController($scope, $categoriesData) {
    var baseUrl = 'http://softuni-ads.azurewebsites.net/api';
    // var baseUrl = 'http://localhost:1337/api';

    $categoriesData.getAll(baseUrl).then(
        function (data, status, headers, config) {
            $scope.categories = data;
            console.log(data);
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });
});