require.config({
    baseUrl: chrome.extension.getURL("/") + 'src/content/js',
    paths: {
        'jquery': '../../../bower_components/jquery-2.2.4.min/index'
    }
});

define('background', ['jquery', 'parser', 'config'], function ($, parser, config){
    function onMessage(request, sender, sendResponse){
        if(!request.query){
            return;
        }

        if(request.type === 'word'){
            searchWord(request, sendResponse);
        }else if(request.type === 'sentence'){
            searchSentence(request, sendResponse);
        }

        return true;
    }

    function searchWord(request, callback){
        var searchUrl = config.SEARCH_URL.NAVER;
        var url = searchUrl.replace('{0}', encodeURIComponent(request.query));
        $.ajax({
            url: url,
            success: function (data){
                var result = parser.parseResultForNaver(data);
                if(result){
                    callback({query: request.query, cursorX: request.cursorX, cursorY: request.cursorY, result: request.query + ' : ' + result});
                }
            }
        });
    }

    function searchSentence(request, callback){
        var searchUrl = config.SEARCH_URL.GOOGLE;
        var url = searchUrl.replace('{0}', encodeURIComponent(request.query.replace(/\n/g, '')));
        $.ajax({
            url: url,
            success: function (data){
                var result = parser.parseResultForGoogle(data);
                if(result){
                    callback({query: request.query, cursorX: request.cursorX, cursorY: request.cursorY, result: result});
                }
            }
        });
    }

    function initialize(){
        chrome.runtime.onMessage.addListener(onMessage);
    }

    return {
        initialize: initialize
    };
});

require(['background'], function (background){
    background.initialize();
});