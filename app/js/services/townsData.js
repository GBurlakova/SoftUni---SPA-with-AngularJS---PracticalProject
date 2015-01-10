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

    var createTown= function (town) {
        var serviceUrl = BASE_URL + '/admin/towns';
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.post(serviceUrl, authorizationHeader, town);
    };

    var deleteTown = function (townId) {
        var serviceUrl = BASE_URL + '/admin/towns/' + townId;
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.delete(serviceUrl, authorizationHeader);
    };

    var editTown = function (townId, town) {
        var serviceUrl = BASE_URL + '/admin/towns/' + categoryId;
        var authorizationHeader = usersData.getAuthorizationHeader();
        return requester.put(serviceUrl, authorizationHeader, town);
    };

    return {
        getAll: getAll,
        getAdminTowns: getAdminTowns,
        createTown: createTown,
        deleteTown: deleteTown,
        editTown: editTown
    }
});