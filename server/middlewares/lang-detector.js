var config = require('../config');

/**
 * Simple middleware to detect interface language.
 * Just checks the lang query parameter to set language up and
 * the first supported language as a fallback.
 */
module.exports = function (req, res, next) {
    var supportedLangs = config.i18n.langs;
    var lang = req.query.lang;

    req.i18n = {
        lang: supportedLangs.indexOf(lang) !== -1 ? lang : supportedLangs[0]
    };

    next();
};
