modules.require(['app', 'jquery', 'bh', 'y-i18n'], function (App, $, bh, i18n) {
    bh.lib.i18n = i18n;
    var app = new App($('.app'));
    app.start();
});
