module.exports = function (bh) {
    bh.match('config', function (ctx) {
        ctx.tag('script');
        ctx.attr('id', 'config');
        ctx.attr('type', 'text/json');
        ctx.content(JSON.stringify(ctx.param('data')));
    });
};
