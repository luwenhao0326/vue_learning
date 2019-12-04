function parseCookie(req, res, next) {
    if (req.headers.cookie) {
        var keys = req.headers.cookie.split("; ");

        req.cookies = {};

        keys.forEach(function(el){
            var kv = el.split("=");
            req.cookies[kv[0]] = kv[1];
        });
    }
    next();

}

module.exports = parseCookie;