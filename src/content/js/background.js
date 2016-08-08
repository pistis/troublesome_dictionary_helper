require.config({
    baseUrl : chrome.extension.getURL("/") + 'src/content/js',
    paths : {
        'jquery' : '../../../bower_components/jquery-2.2.4.min/index'
    }
});

define('background', ['jquery', 'parser'], function($, parser){
    function onMessage(request, sender, sendResponse){
        if(!request.query){
            return;
        }

        console.log(request.query)
        if(request.type === 'word'){
            searchWord(request, sendResponse);
        }else if(request.type === 'sentence'){
            searchSentence(request, sendResponse);
        }

        return true;
    }

    function searchWord(request, callback){
        var searchUrl = "http://tooltip.dic.naver.com/tooltip.nhn?wordString={0}&languageCode=4&nlp=false";
        var url = searchUrl.replace('{0}', encodeURIComponent(request.query));
        $.ajax({
            url : url,
            success : function(data){
                var result = parser.parseResultForNaver(data);
                if(result){
                    callback({query : request.query, cursorX : request.cursorX, cursorY : request.cursorY, result : request.query + ' : ' + result});
                }
            }
        });
    }

    function searchSentence(request, callback){
        var searchUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&hl=ko&dt=t&dt=bd&dj=1&source=icon&q={0}";
        var url = searchUrl.replace('{0}', encodeURIComponent(request.query.replace(/\n/g, '')));
        $.ajax({
            url : url,
            success : function(data){
                var result = parser.parseResultForGoogle(data);
                if(result){
                    callback({query : request.query, cursorX : request.cursorX, cursorY : request.cursorY, result : result});
                }
            }
        });
    }

    function initialize(){
        chrome.runtime.onMessage.addListener(onMessage);
    }

    return {
        initialize : initialize
    };
});

require(['background'], function(background){
    console.log("background.js init");
    background.initialize();
});