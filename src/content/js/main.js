require.config({
    baseUrl: chrome.extension.getURL("/") + 'src/content/js',
    paths: {
        'jquery': '../../../bower_components/jquery-2.2.4.min/index',
        'underscore': '../../../bower_components/underscore/underscore-min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        }
    }
});

require(
    ["app"],
    function (app){
        app.run();
    }
);