define([
    'crypto'
], function (crypto) {
    var generate = function (email) {
        var hashedEmail = crypto.MD5(email.trim().toLowerCase());
        return 'http://www.gravatar.com/avatar/' + hashedEmail;
    };

    return {
        generate: generate
    };
});
