app.factory('townsData', function (requester, BASE_URL, usersData) {
    var getAll = function () {
        var serviceUrl = BASE_URL + '/towns';
        return requester.get(serviceUrl, null);
    };

    var getAdminTowns = function (urlParams) {
        var serviceUrl = BASE_URL + '/admin/towns?sortBy=' + urlParams.sortBy +
            '&startPage=' + urlParams.startPage +
            '&pageSize=' + urlParams.pageSize;
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.get(serviceUrl, authorizationHeader, null);
    };

    return {
        getAll: getAll,
        getAdminTowns: getAdminTowns
    }
});