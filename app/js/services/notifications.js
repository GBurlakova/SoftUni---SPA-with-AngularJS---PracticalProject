app.factory('$notifications', function () {
    var MESSAGE_TIMEOUT = 3000;

    var showErrorMessage = function (msg) {
        noty({
                text: msg,
                type: 'error',
                layout: 'topCenter',
                timeout: MESSAGE_TIMEOUT}
        );
    };

    var showSuccessMessage = function (MSG) {
        noty({
                text: msg,
                type: 'success',
                layout: 'topCenter',
                timeout: MESSAGE_TIMEOUT}
        );
    };

    return {
        success: showSuccessMessage,
        error: showErrorMessage
    }
});