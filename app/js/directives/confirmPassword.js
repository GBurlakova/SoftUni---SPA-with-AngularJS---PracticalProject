app.directive("confirmPassword", function() {
    return {
        require: "ngModel",
        scope: {
            confirmPassword: '='
        },
        link: function(scope, element, attrs, ctrl) {
            scope.$watch(function() {
                var combined;

                if (scope.confirmPassword || ctrl.$viewValue) {
                    combined = scope.confirmPassword + '_' + ctrl.$viewValue;
                }
                return combined;
            }, function(value) {
                if (value) {
                    ctrl.$parsers.unshift(function(viewValue) {
                        var origin = scope.confirmPassword;
                        if (origin !== viewValue) {
                            ctrl.$setValidity("confirmPassword", false);
                            return undefined;
                        } else {
                            ctrl.$setValidity("confirmPassword", true);
                            return viewValue;
                        }
                    });
                }
            });
        }
    };
});