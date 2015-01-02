app.directive('confirmPassword', [function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var $passwordToBeConfirmed = $('#' + attrs.confirmPassword);
            var $confirmPassword = $(elem);

            $confirmPassword.on('input', function () {
                scope.$apply(function () {
                    var passwordsAreEqual = $confirmPassword.val() === $passwordToBeConfirmed.val();
                    ctrl.$setValidity('passwordsNotMatch', passwordsAreEqual);
                });
            });

            $passwordToBeConfirmed.on('input', function () {
                scope.$apply(function () {
                    var passwordsAreEqual = $confirmPassword.val() === $passwordToBeConfirmed.val();
                    ctrl.$setValidity('passwordsNotMatch', passwordsAreEqual);
                });
            });
        }
    }
}]);