var app = require('../../server/app');
require('chai').should();

// Server-side test example
describe('app', function () {
    it('should be defined', function () {
        app.should.be.defined;
    });
});
