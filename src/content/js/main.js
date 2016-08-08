require.config({
    baseUrl : chrome.extension.getURL("/") + 'src/content/js',
    paths : {
        'jquery' : '../../../bower_components/jquery-2.2.4.min/index'
    },
    shim : {
        'jquery' : {
            exports : '$'
        }
    }
});

require(
    ["app"],
    function(app){
        app.run();
    }
);