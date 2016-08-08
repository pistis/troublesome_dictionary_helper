/**
 * TODO : database에 저장
 */
define([], function(){

    var source = {};
    var Model = {
        getResult : function(query){
            return source[query];
        },

        setResult : function(query, result){
            source[query] = result;
        }
    };

    return Model;

});