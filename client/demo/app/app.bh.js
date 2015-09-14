module.exports = function (bh) {
    bh.match('app', function (ctx) {
        ctx.js(true);
    });
};
