/**
 * TODO : database에 저장
 */
define('model', ['storage', 'config'], function (storage, CONFIG){

    var source = null;
    storage.initialize();
    storage.load(CONFIG.STORAGE.KEY, function (items){
        source = (items && items[CONFIG.STORAGE.KEY]) ? items[CONFIG.STORAGE.KEY] : {};
        console.log('load ', source);
        Model.syncToStorage();
    });
    var Model = {
        createItem: function (query, result){
            return {
                w: query,  // word
                m: result, // meaning
                fc: 0,     // frequencyCount
                sc: 0      // searchCount
            };
        },

        getResult: function (query){
            if(!source || !source[query]){
                return null;
            }
            return source[query].m;
        },

        setResult: function (query, result){
            if(!source){
                return;
            }
            source[query] = this.createItem(query, result);
        },

        increaseSearchCount: function (query){
            if(!source){
                return;
            }
            source[query].sc += 1;
        },

        syncToStorage: function (){
            setInterval(function (){
                if(source){
                    storage.setData(CONFIG.STORAGE.KEY, source);
                }
            }, CONFIG.STORAGE.SYNC_INTERVAL_TIME);
        }
    };

    return Model;

});