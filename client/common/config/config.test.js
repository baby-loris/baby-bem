modules.define('test', ['config'], function (provide, config) {

    describe('config', function () {
        it('should return an emptry object by default', function () {
            config.should.be.empty;
        });
    });

    provide();
});
