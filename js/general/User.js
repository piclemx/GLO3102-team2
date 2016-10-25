define(['js/models/LoginModel'],
    function (LoginModel) {
        var user = new LoginModel();

        user.on('invalid', function (model, error) {
            $('#error-handler').text(error);
        });

        return user;
    }
);
