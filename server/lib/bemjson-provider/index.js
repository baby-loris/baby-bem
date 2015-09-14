module.exports = function (data) {
    return {
        block: 'page',
        styles: [
            {elem: 'css', url: data.assetsPath + '.css'}
        ],
        scripts: [
            {elem: 'js', url: [data.assetsPath, data.i18n.lang, 'js'].join('.')}
        ],
        mods: {theme: 'islands'},
        content: [
            {
                block: 'app',
                mods: {
                    loading: 'yes'
                },
                js: {
                    // WARNING! It's only an example of the client config
                    // Don't proxy all server data to the client side!
                    data: data
                },
                content: [
                    {
                        block: 'spin',
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            visible: true
                        }
                    }
                ]
            }
        ]
    };
};
