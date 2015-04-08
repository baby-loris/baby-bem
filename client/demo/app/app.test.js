modules.define('test', ['app'], function (provide, App) {

    // Client-side test example
    describe('app', function () {
        it('should be defined', function () {
            App.should.be.defined;
        });
    });

    provide();
});
