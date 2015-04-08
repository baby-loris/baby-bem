module.exports = function (data) {
    return {
        block: 'page',
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
                    }
                ]
            }
        ]
    };
};
