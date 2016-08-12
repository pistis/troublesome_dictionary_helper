require.config({
    baseUrl: chrome.extension.getURL("/") + 'src/content/js',
    paths: {
        'jquery': '../../../bower_components/jquery-2.2.4.min/index',
        'underscore': '../../../bower_components/underscore/underscore-min',
        'firebase': '../../../bower_components/firebase/firebase'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'underscore': {
            exports: '_'
        },
        'firebase': {
            exports: 'firebase'
        }
    }
});

require(
    ["app"],
    function (app){
        app.run();
    }
);