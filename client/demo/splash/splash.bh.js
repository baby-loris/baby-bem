module.exports = function (bh) {

    bh.match('splash', function (ctx) {
        ctx.content([
            {
                elem: 'title',
                content: bh.lib.i18n('splash', 'title')
            },
            {
                block: 'button',
                mods: {
                    size: 'xl',
                    theme: 'islands',
                    type: 'link',
                    view: 'action'
                },
                url: 'https://github.yandex-team.ru/hevil/baby-bem/blob/master/README.md',
                text: bh.lib.i18n('splash', 'read-more')
            }
        ]);
    });
};
