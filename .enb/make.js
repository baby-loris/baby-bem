module.exports = function (config) {
    config.setLanguages(['en', 'ru']);

    function getLevels() {
        return [
            {path: 'node_modules/bem-core/common.blocks', check: false},
            {path: 'node_modules/bem-core/desktop.blocks', check: false},
            {path: 'node_modules/bem-components/common.blocks', check: false},
            {path: 'node_modules/bem-components/desktop.blocks', check: false},
            {path: 'node_modules/bem-components/design/common.blocks', check: false},
            {path: 'node_modules/bem-components/design/desktop.blocks', check: false},
            'client/common',
            'client/demo'
        ];
    }

    function getTestLevels() {
        return [
            'client/common',
            'client/demo'
        ];
    }

    config.nodes('pages/*');
    config.nodeMask(/pages\/.*/, function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb-bem-techs/techs/files')],
            [require('enb/techs/file-provider'), {target: '?.bemdecl.js'}],
            [require('enb-bem-techs/techs/levels'), {levels: getLevels()}],
            [require('enb-modules/techs/deps-with-modules')],
            [require('enb-stylus/techs/stylus'), {
                autoprefixer: {
                    browsers: [
                        'IE >= 9',
                        'Safari >= 5',
                        'Chrome >= 33',
                        'Opera >= 12.16',
                        'Firefox >= 28'
                    ]
                }
            }],
            [require('enb-js/techs/browser-js'), {target: '?.pre.js'}],
            [require('enb-bh/techs/bh-commonjs'), {
                bhOptions: {
                    jsAttrName: 'data-bem',
                    jsAttrScheme: 'json'
                }
            }],
            [require('enb-bh/techs/bh-bundle'), {
                bhOptions: {
                    jsAttrName: 'data-bem',
                    jsAttrScheme: 'json',
                },
                requires: {i18n: {ym: 'y-i18n'}},
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
        nodeConfig.addTargets(['_?.{lang}.js', '_?.css', '?.bh.js']);

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
            [require('enb-bem-techs/techs/levels'), {
                levels: getTestLevels(),
                target: '?.test.levels'
            }],
            [require('enb/techs/bemdecl-test'), {
                target: 'client.bemdecl.js',
                levelsTarget: '?.test.levels'
            }],
            [require('enb/techs/js-test')],
            [require('enb-modules/techs/deps-with-modules')],
            [require('enb/techs/i18n-merge-keysets'), {lang: 'all'}],
            [require('enb/techs/i18n-merge-keysets'), {lang: 'ru'}],
            [require('enb-y-i18n/techs/y-i18n-lang-js'), {lang: 'all'}],
            [require('enb-y-i18n/techs/y-i18n-lang-js'), {lang: '{lang}'}],
            [require('enb-js/techs/browser-js'), {target: '?.source.js'}],
            [require('enb-bh/techs/bh-bundle'), {
                bhOptions: {
                    jsAttrName: 'data-bem',
                    jsAttrScheme: 'json',
                },
                requires: {i18n: {ym: 'y-i18n'}},
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
