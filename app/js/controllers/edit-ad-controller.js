app.controller('EditAdController', function ($scope, $rootScope, $routeParams, $location,
                                             townsData, categoriesData, adsData, notifications) {
    var DEFAULT_AD_IMAGE = 'http://www.agetruck.com/truck_img/default.gif';
    var CANNOT_LOAD_AD_MESSAGE = 'The ad chosen cannot be loaded. Please try again later!';
    var AD_SUCCESSFULLY_EDITED_MESSAGE = 'Ad successfully edited';
    var AD_CANNOT_BE_EDITED_MESSAGE = 'Ad cannot be edited. Please try again later!';
    var CONFIRM_AD_EDIT_MESSAGE = 'Would you like to edit the ad?';
    var adToBeEditedId = $routeParams.id;

    $scope.defaultImage = DEFAULT_AD_IMAGE;
    $scope.changeImageFunctionSelected = false;
    $scope.adNotLoaded = true;

    $scope.editedAdData = {
        title: '',
        text: '',
        imageDataUrl: '',
        changeImage: false,
        categoryId: '',
        townId: ''
    };

    editAdPageLoaded();

    adsData.getUserAdById(adToBeEditedId)
        .then(function (data) {
            $scope.editedAdData = {
                title: data.title,
                text: data.text,
                imageDataUrl: data.imageDataUrl,
                categoryId: data.categoryId,
                townId: data.townId
            };
            $scope.adNotLoaded = false;
        }, function () {
            notifications.error(CANNOT_LOAD_AD_MESSAGE);
        });

    townsData.getAll().then(
        function (data, status, headers, config) {
            $scope.towns = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    categoriesData.getAll().then(
        function (data, status, headers, config) {
            $scope.categories = data;
        },
        function (error, status, headers, config) {
            console.log(error, status);
        });

    // Scope functions
    $scope.cancel = function () {
        $location.path('/user/ads');
    };

    $scope.editAd = function (editedAdData) {
        notifications.confirm(CONFIRM_AD_EDIT_MESSAGE).then(
            function () {
                executeEditAd(adToBeEditedId, editedAdData);
            }
        );
    };

    $scope.fileSelected = function(fileInputField) {
        delete $scope.editedAdData.imageDataUrl;
        var file = fileInputField.files[0];
        if (file.type.match(/image\/.*/)) {
            var reader = new FileReader();
            reader.onload = function () {
                var image = reader.result;
                $scope.editedAdData.imageDataUrl = image;
                // $('#change-image').removeAttr('disabled').animate({backgroundColor: 'rgb(240, 156, 94)'}, 500);
                $scope.editedAdData.changeImage = true;
                $("#ad-image").html("<img src='" + image + "'>");
            };
            reader.readAsDataURL(file);
        } else {
            $("#ad-image").html("<p>File type not supported!</p>");
        }
    };

    $scope.showImageFileInput = function () {
        $scope.changeImageFunctionSelected = true;
    };

    $scope.deleteImage = function () {
        $scope.editedAdData.imageDataUrl = '';
        $scope.editedAdData.changeImage = true;
        $("#ad-image").html("<img src='" + DEFAULT_AD_IMAGE + "'>");
    };

    // Private functions
    function editAdPageLoaded() {
        $rootScope.$broadcast('editAdPageLoaded');
    }

    function executeEditAd(adToBeEditedId, editedAdData) {
        adsData.editUserAd(adToBeEditedId, editedAdData)
            .then(
            function () {
                notifications.success(AD_SUCCESSFULLY_EDITED_MESSAGE)
                    .then(function () {
                        $location.path('/user/ads');
                    });
            },
            function () {
                notifications.error(AD_CANNOT_BE_EDITED_MESSAGE);
            }
        );
    }
});