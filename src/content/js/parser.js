/**
 * TODO
 * - en, zh, ko 등 config 설정이 가능하도록
 */
define('parser', [], function(){

    var Parser = {
        /**
         * TODO
         * - refactoring duplication regex
         * - Entity
         * - multi language
         * @param text
         * @param offset
         * @returns {*}
         */
        parseWord : function(text, offset){
            var test = /[a-zA-Z]+/g;
            var reg = /[a-zA-Z]+/g;

            if(!test.test(text.substring(offset, offset + 1))){
                return null;
            }

            var ret, matched;
            while((matched = reg.exec(text)) !== null){
                if(matched.index <= offset && offset < reg.lastIndex){
                    ret = text.substring(matched.index, reg.lastIndex);
                    break;
                }
            }
            ret = this.decodeUnicode(ret);

            return ret;
        },

        decodeUnicode : function(word){
            if(!word)
                return word;
            word = word.replace(/&#(\d+);/gm, function(){
                return String.fromCharCode(RegExp.$1)
            });
            return word
        },

        getText : function(doc, e){
            var text = '';
            var offset;
            if(doc.caretRangeFromPoint){ // WebKit (for Chrome Browser)
                var range = doc.caretRangeFromPoint(e.clientX, e.clientY);
                var node = range && range.startContainer;
                if(node && node.nodeType === 3){
                    text = node.textContent;
                    offset = range.startOffset;
                }
            }

            if(text){
                text = this.parseWord(text, offset);
            }

            if(range){
                range.setStart(range.startContainer, 0);
                range.setEnd(range.startContainer, range.startContainer.length);
                var rect = range.getBoundingClientRect();
                if(rect.left > e.clientX || rect.right < e.clientX ||
                    rect.top > e.clientY || rect.bottom < e.clientY){
                    return null;
                }
            }

            return text && text.toLowerCase().trim();
        },

        parseResultForNaver : function(data){
            var result = null;
            try{
                data = JSON.parse(data);
                result = data.mean.join(',');
            }catch(e){
            }

            return result;
        },

        parseResultForGoogle : function(data){
            var result = null;
            try{
                if(data && data.sentences && data.sentences.length > 0){
                    result = data.sentences[0].trans;
                }
            }catch(e){
            }

            return result;
        }
    };

    return Parser;

});