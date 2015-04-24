var path = require('path');
var vow = require('vow');
var assets = require('../../configs/current/assets.js');
var hosts = require('../../configs/current/hosts.js');

var PAGES_DIRECTORY = 'pages';

/**
 * Builds pages from sources. Responds with HTML.
 *
 * @param {String} pageName
 * @returns {Function} middleware Express middleware.
 */
module.exports = function (pageName) {
    return function (req, res, next) {
        var lang = req.i18n.lang;
        var pagePath = path.join(PAGES_DIRECTORY, pageName);
        var getBemJson = require('../lib/bemjson-provider/' + pageName);

        vow.all([
            assets.require(buildAssetPath(pagePath, 'bh')),
            assets.require(buildAssetPath(pagePath, 'lang.' + lang))
        ]).spread(function (bh, buildI18n) {
            var i18n = buildI18n();
            var data = getCommonData(pagePath, i18n);
            var bemjson = getBemJson(data, i18n);
            bh.lib.i18n = i18n;
            res.send(bh.apply(bemjson));
        }).fail(function (error) {
            next(error);
        });
    };
};

/**
 * Returns an initial data which common for all pages.
 *
 * @param {String} pagePath
 * @param {Function} i18n
 * @returns {Object}
 */
function getCommonData(pagePath, i18n) {
    var pageName = path.basename(pagePath);

    return {
        assetsPath: hosts.static + pagePath + '/_' + pageName,
        i18n: {
            lang: i18n.getLanguage()
        }
    };
}

/**
 * Generates build path for the specified page.
 *
 * @param {String} pagePath
 * @param {String} assetName
 * @returns {String}
 */
function buildAssetPath(pagePath, assetName) {
    return '/' + pagePath + '/' + path.basename(pagePath) + '.' + assetName + '.js';
}
