app.factory('notifications', function ($q) {
    var MESSAGE_TIMEOUT = 3000;

    var showErrorMessage = function (msg) {
        var deferred = $q.defer();

        noty({
                text: msg,
                type: 'error',
                layout: 'topCenter',
                timeout: MESSAGE_TIMEOUT}
        );

        setTimeout(function () {
            deferred.resolve();
        }, MESSAGE_TIMEOUT);

        return deferred.promise;
    };

    var showSuccessMessage = function (msg) {
        var deferred = $q.defer();

        noty({
                text: msg,
                type: 'success',
                layout: 'topCenter',
                timeout: MESSAGE_TIMEOUT}
        );

        setTimeout(function () {
            deferred.resolve();
        }, MESSAGE_TIMEOUT);

        return deferred.promise;
    };

    var showConfirmMessage = function (confirmMessage) {
        var deferred = $q.defer();

        noty(
            {
                text: confirmMessage,
                type: 'confirm',
                layout: 'topCenter',
                buttons: [
                    {
                        text : "Yes",
                        onClick : function($noty) {
                            deferred.resolve();
                            $noty.close();
                        }
                    },
                    {
                        text : "Cancel",
                        onClick : function($noty) {
                            deferred.reject();
                            $noty.close();
                        }
                    }
                ]}
        );

        return deferred.promise;
    };

    return {
        success: showSuccessMessage,
        error: showErrorMessage,
        confirm: showConfirmMessage
    }
});