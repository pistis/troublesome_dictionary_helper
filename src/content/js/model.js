/**
 * TODO : database에 저장
 */
define('model', ['underscore', 'storage', 'config', 'util', 'events'], function (_, storage, CONFIG, util, Events){

    var source = {};
    //storage.initialize();
    //storage.load(CONFIG.STORAGE.KEY, function (items){
    //    source = (items && items[CONFIG.STORAGE.KEY]) ? items[CONFIG.STORAGE.KEY] : {};
    //    console.log('load ', source);
    //    var bytes = util.getByteLength(JSON.stringify(source));
    //    console.log('[load] chrome storage size : ', bytes + ' b', ' ', (bytes / 1024).toFixed(2) + ' kb', ' ', (bytes / 1024 / 1024).toFixed(2) + ' mb');
    //    //Model.syncToStorage();
    //});

    var Model = {
        events: new Events(),
        getEvents: function (){
            return this.events;
        },

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
            this.events.trigger('SET_RESULT', source);
        },

        increaseSearchCount: function (query){
            if(!source){
                return;
            }
            source[query].sc += 1;
        },

        getSearchCount: function (){
            if(!source || !source[query]){
                return 0;
            }

            return source[query].sc;
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