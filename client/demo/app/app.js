modules.define('app', ['inherit', 'jquery', 'bh', 'i-bem__dom'], function (provide, inherit, $, bh, BEMDOM) {
    var App = inherit({
        __constructor: function (domNode) {
            this._domNode = $(domNode);
        },

        start: function () {
            this._removeSpinner();
            this._showSplashScreen();
        },

        _removeSpinner: function () {
            var spinDomNode = this._domNode.find('.spin');
            BEMDOM.destruct(spinDomNode);
            this._domNode.bem('app').delMod('loading');
        },

        _showSplashScreen: function () {
            var splashDomNode = $(bh.apply({block: 'splash'}));
            this._domNode.append(splashDomNode);
            BEMDOM.init(splashDomNode);
        }
    });

    provide(App);
});
