app.factory('$usersData', function ($requester) {
    var register = function (baseUrl, registerData) {
        var serviceUrl = baseUrl + '/user/register';
        return $requester.post(serviceUrl, null, registerData);
    };

    return{
        register: register
    }
});