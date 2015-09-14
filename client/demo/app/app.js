modules.define('app', ['i-bem__dom', 'bh'], function (provide, BEMDOM, bh) {

    provide(BEMDOM.decl(this.name, {
        onSetMod: {
            js: {
                inited: function () {
                    this
                        ._removeSpinner()
                        ._showSplashScreen();

                    console.log(this.params.data);
                }
            }
        },
        _removeSpinner: function () {
            var spinDomNode = this.findBlockInside('spin').domElem;
            BEMDOM.destruct(spinDomNode);

            return this.delMod('loading');
        },

        _showSplashScreen: function () {
            var splashHtml = bh.apply({block: 'splash'});
            BEMDOM.append(this.domElem, splashHtml);

            return this;
        }
    }));

});
