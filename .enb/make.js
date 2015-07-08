module.exports = function (config) {
    config.setLanguages(['en', 'ru']);

    function getLevels() {
        return [
            'node_modules/bem-core/common.blocks',
            'node_modules/bem-core/desktop.blocks',
            'node_modules/bem-components/common.blocks',
            'node_modules/bem-components/desktop.blocks',
            'node_modules/bem-components/design/common.blocks',
            'node_modules/bem-components/design/desktop.blocks',
            'client/common',
            'client/demo'
        ].map(config.resolvePath.bind(config));
    }

    config.nodes('pages/*');
    config.nodeMask(/pages\/.*/, function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb-bem-techs/techs/files')],
            [require('enb/techs/file-provider'), {target: '?.bemdecl.js'}],
            [require('enb-bem-techs/techs/levels'), {levels: getLevels()}],
            [require('enb-modules/techs/deps-with-modules')],
            [require('enb-stylus/techs/css-stylus-with-autoprefixer'), {
                autoprefixerArguments: [
                    'IE >= 9',
                    'Safari >= 5',
                    'Chrome >= 33',
                    'Opera >= 12.16',
                    'Firefox >= 28'
                ]
            }],
            [require('enb-diverse-js/techs/browser-js'), {target: '?.pre.js'}],
            [require('enb-bh/techs/bh-server'), {jsAttrName: 'data-bem', jsAttrScheme: 'json'}],
            [require('enb-bh/techs/bh-client-module'), {
                jsAttrName: 'data-bem',
                jsAttrScheme: 'json',
                target: '?.client.bh.js'
            }],
            [require('enb-priv-js/techs/pub-js-i18n'), {
                target: '?.pre.{lang}.js',
                jsTarget: '?.pre.js',
                bemhtmlTarget: '?.client.bh.js',
                lang: '{lang}'
            }],
            [require('enb-modules/techs/prepend-modules'), {source: '?.pre.{lang}.js', target: '?.{lang}.js'}],
            [require('enb/techs/i18n-merge-keysets'), {lang: 'all'}],
            [require('enb/techs/i18n-merge-keysets'), {lang: '{lang}'}],
            [require('enb-y-i18n/techs/y-i18n-lang-js'), {lang: 'all'}],
            [require('enb-y-i18n/techs/y-i18n-lang-js'), {lang: '{lang}'}]
        ]);
        nodeConfig.addTargets(['_?.{lang}.js', '_?.css']);

        nodeConfig.mode('development', function (nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/file-copy'), {sourceTarget: '?.{lang}.js', destTarget: '_?.{lang}.js'}],
                [require('enb/techs/file-copy'), {sourceTarget: '?.css', destTarget: '_?.css'}]
           ]);
        });

        nodeConfig.mode('production', function (nodeConfig) {
            nodeConfig.addTechs([
                [require('enb-borschik/techs/borschik'), {sourceTarget: '?.{lang}.js', destTarget: '_?.{lang}.js'}],
                [require('enb-borschik/techs/borschik'), {sourceTarget: '?.css', destTarget: '_?.css', freeze: 'yes'}]
           ]);
        });
    });

    config.node('tests/client', function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb-bem-techs/techs/files')],
            [require('enb-bem-techs/techs/levels'), {levels: getLevels()}],
            [require('enb/techs/bemdecl-test'), {target: 'client.bemdecl.js'}],
            [require('enb/techs/js-test')],
            [require('enb-modules/techs/deps-with-modules')],
            [require('enb/techs/i18n-merge-keysets'), {lang: 'all'}],
            [require('enb/techs/i18n-merge-keysets'), {lang: 'ru'}],
            [require('enb-y-i18n/techs/y-i18n-lang-js'), {lang: 'all'}],
            [require('enb-y-i18n/techs/y-i18n-lang-js'), {lang: '{lang}'}],
            [require('enb-diverse-js/techs/browser-js'), {target: '?.source.js'}],
            [require('enb-bh/techs/bh-client-module'), {
                jsAttrName: 'data-bem',
                jsAttrScheme: 'json',
                target: '?.client.bh.js'
            }],
            [require('enb-priv-js/techs/pub-js-i18n'), {
                target: '?.pre.js',
                jsTarget: '?.source.js',
                bemhtmlTarget: '?.client.bh.js',
                lang: config.getLanguages()[0]
            }],
            [require('enb-modules/techs/prepend-modules'), {source: '?.pre.js', target: '?.js'}],
            [require('enb/techs/file-provider'), {target: 'test.html'}],
            [require('enb/techs/file-provider'), {target: 'mocha.js'}],
            [require('enb/techs/file-provider'), {target: 'mocha.css'}],
            [require('enb/techs/file-provider'), {target: 'chai.js'}],
            [require('enb/techs/file-provider'), {target: 'sinon.js'}]
        ]);

        nodeConfig.addTargets([
            '?.js',
            '?.test.js'
        ]);
    });
};
