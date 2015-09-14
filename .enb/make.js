var enbBemTechs = require('enb-bem-techs');
var techs = {
    fileProvider: require('enb/techs/file-provider'),
    depsWithModules: require('enb-modules/techs/deps-with-modules'),
    stylus: require('enb-stylus/techs/stylus'),
    browserJs: require('enb-diverse-js/techs/browser-js'),
    bhCommonJs: require('enb-bh/techs/bh-commonjs'),
    bhBundle: require('enb-bh/techs/bh-bundle'),
    pubJsI18n: require('enb-priv-js/techs/pub-js-i18n'),
    prependModules: require('enb-modules/techs/prepend-modules'),
    mergeKeysets: require('enb/techs/i18n-merge-keysets'),
    yi18n: require('enb-y-i18n/techs/y-i18n-lang-js'),
    fileCopy: require('enb/techs/file-copy'),
    borschik: require('enb-borschik/techs/borschik'),
    bemdeclTest: require('enb/techs/bemdecl-test'),
    jsTests: require('enb/techs/js-test')
};
var bhOptions = {
    jsAttrName: 'data-bem',
    jsAttrScheme: 'json'
};

function getLevels() {
    return [
        {path: 'libs/bem-core/common.blocks', check: false},
        {path: 'libs/bem-core/desktop.blocks', check: false},
        {path: 'libs/bem-components/common.blocks', check: false},
        {path: 'libs/bem-components/desktop.blocks', check: false},
        {path: 'libs/bem-components/design/common.blocks', check: false},
        {path: 'libs/bem-components/design/desktop.blocks', check: false},
        'client/common',
        'client/demo'
    ];
}

module.exports = function (config) {
    config.setLanguages(['en', 'ru']);

    config.nodes('pages/*');
    config.nodeMask(/pages\/.*/, function (nodeConfig) {
        nodeConfig.addTechs([
            [enbBemTechs.files],
            [techs.fileProvider, {target: '?.bemdecl.js'}],
            [enbBemTechs.levels, {levels: getLevels()}],
            [techs.depsWithModules],
            [techs.stylus, {
                target: '?.dev.css',
                autoprefixer: {
                    browsers: [
                        'IE >= 9', 'Safari >= 5', 'Chrome >= 33', 'Opera >= 12.1', 'Firefox >= 28'
                    ]
                }
            }],
            [techs.browserJs, {target: '?.pre.js'}],
            [techs.bhCommonJs, {
                bhOptions: bhOptions,
                mimic: 'BEMHTML'
            }],
            [techs.bhBundle, {
                bhOptions: bhOptions,
                requires: {i18n: {ym: 'y-i18n'}},
                target: '?.client.bh.js'
            }],
            [techs.pubJsI18n, {
                target: '?.pre.{lang}.js',
                jsTarget: '?.pre.js',
                bemhtmlTarget: '?.client.bh.js',
                lang: '{lang}'
            }],
            [techs.prependModules, {source: '?.pre.{lang}.js', target: '?.dev.{lang}.js'}],
            [techs.mergeKeysets, {lang: 'all'}],
            [techs.mergeKeysets, {lang: '{lang}'}],
            [techs.yi18n, {lang: 'all'}],
            [techs.yi18n, {lang: '{lang}'}]
        ]);
        nodeConfig.addTargets(['?.{lang}.js', '?.css']);

        nodeConfig.mode('development', function (nodeConfig) {
            nodeConfig.addTechs([
                [techs.fileCopy, {sourceTarget: '?.dev.{lang}.js', destTarget: '?.{lang}.js'}],
                [techs.fileCopy, {sourceTarget: '?.dev.css', destTarget: '?.css'}]
           ]);
        });

        nodeConfig.mode('production', function (nodeConfig) {
            nodeConfig.addTechs([
                [techs.borschik, {sourceTarget: '?.dev.{lang}.js', destTarget: '?.{lang}.js'}],
                [techs.borschik, {sourceTarget: '?.dev.css', destTarget: '?.css'}]
           ]);
        });
    });

    config.node('tests/client', function (nodeConfig) {
        nodeConfig.addTechs([
            [enbBemTechs.files],
            [enbBemTechs.levels, {levels: getLevels()}],
            [enbBemTechs.levels, {
                levels: ['client/common', 'client/demo'],
                target: '?.test.levels'
            }],
            [techs.bemdeclTest, {
                target: 'client.bemdecl.js',
                levelsTarget: '?.test.levels'
            }],
            [techs.jsTests],
            [techs.depsWithModules],
            [techs.mergeKeysets, {lang: 'all'}],
            [techs.mergeKeysets, {lang: 'ru'}],
            [techs.yi18n, {lang: 'all'}],
            [techs.yi18n, {lang: '{lang}'}],
            [techs.browserJs, {target: '?.source.js'}],
            [techs.bhBundle, {
                bhOptions: bhOptions,
                requires: {i18n: {ym: 'y-i18n'}},
                target: '?.client.bh.js'
            }],
            [techs.pubJsI18n, {
                target: '?.pre.js',
                jsTarget: '?.source.js',
                bemhtmlTarget: '?.client.bh.js',
                lang: config.getLanguages()[0]
            }],
            [techs.prependModules, {source: '?.pre.js', target: '?.js'}],
            [techs.fileProvider, {target: 'test.html'}],
            [techs.fileProvider, {target: 'mocha.js'}],
            [techs.fileProvider, {target: 'mocha.css'}],
            [techs.fileProvider, {target: 'chai.js'}],
            [techs.fileProvider, {target: 'sinon.js'}]
        ]);

        nodeConfig.addTargets([
            '?.js',
            '?.test.js'
        ]);
    });
};
