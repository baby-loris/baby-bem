var SUPPORTED_LANGS = ['ru', 'en'];

/**
 * Simple middleware to detect interface language.
 * Just checks the lang query parameter to set language up and
 * the first supported language as a fallback.
 */
module.exports = function (req, res, next) {
    var lang = req.query.lang;

    req.i18n = {
        lang: SUPPORTED_LANGS.indexOf(lang) !== -1 ? lang : SUPPORTED_LANGS[0]
    };

    next();
};
