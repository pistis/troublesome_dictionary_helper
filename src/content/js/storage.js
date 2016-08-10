/**
 * TODO : limit 예외 처리
 */
define('storage', [], function (){

    var Storage = {
        initialize: function (){
            this.setEventListener();
            //this.clear();
        },

        setEventListener: function (){
            chrome.storage.onChanged.addListener(function (changes, namespace){
                for(key in changes){
                    var storageChange = changes[key];
                    console.log('old ', storageChange.oldValue);
                    console.log('new ', storageChange.newValue);
                }
            });
        },

        load: function (key, callback){
            this.getData(key, callback);
        },

        clear: function (){
            chrome.storage.local.clear(function (){
                console.log('clear', arguments);
            });
        },

        getData: function (key, callback){
            chrome.storage.local.get(key, function (items){
                if(callback && typeof callback === 'function'){
                    callback(items);
                }
            });
        },

        setData: function (key, value){
            var data = {};
            data[key] = value;
            chrome.storage.local.set(data, function (){

            });
        }
    };

    return Storage;

});