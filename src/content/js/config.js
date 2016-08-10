define('config', [], function (){

    var CONFIG = {
        SEARCH_URL: {
            NAVER: 'http://tooltip.dic.naver.com/tooltip.nhn?wordString={0}&languageCode=4&nlp=false',
            GOOGLE: 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ko&hl=ko&dt=t&dt=bd&dj=1&source=icon&q={0}'
        },

        SEARCH_TYPE : {
            WORD : 1,
            SENTENCE : 2
        }
    };

    return CONFIG;

});