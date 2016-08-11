/**
 * TODO : database에 저장
 */
define('model', ['storage', 'config', 'util'], function (storage, CONFIG, util){

    var source = null;
    storage.initialize();
    storage.load(CONFIG.STORAGE.KEY, function (items){
        source = (items && items[CONFIG.STORAGE.KEY]) ? items[CONFIG.STORAGE.KEY] : {};
        console.log('load ', source);
        var bytes = util.getByteLength(JSON.stringify(source));
        console.log('[load] chrome storage size : ', bytes + ' b', ' ', (bytes / 1024).toFixed(2) + ' kb', ' ', (bytes / 1024 / 1024).toFixed(2) + ' mb');
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