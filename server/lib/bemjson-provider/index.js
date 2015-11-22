module.exports = function (data) {
    return {
        block: 'page',
        mods: {theme: 'islands'},
        styles: [
            {elem: 'css', url: data.assetsPath + '.css'}
        ],
        scripts: [
            {elem: 'js', url: [data.assetsPath, data.i18n.lang, 'js'].join('.')}
        ],
        content: [
            {
                block: 'app',
                mods: {
                    loading: 'yes'
                },
                content: [
                    {
                        block: 'spin',
                        mods: {
                            theme: 'islands',
                            size: 'xl',
                            visible: true
                        }
                    },
                    {
                        block: 'config',
                        // WARNING! It's only an example of the client config
                        // Don't proxy all server data to the client side!
                        data: data
                    }
                ]
            }
        ]
    };
};
