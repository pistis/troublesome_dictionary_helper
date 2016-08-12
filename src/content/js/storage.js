/**
 * TODO : limit 예외 처리
 */
define('storage', ['firebase', 'util'], function (firebase, util){

    var Storage = {
        initialize: function (){
            var config = {
                apiKey: "AIzaSyDufMQKD4bcDLRolMukKbSkKO60q7UFZ7o",
                authDomain: "troublesome-dictionary-helper.firebaseapp.com",
                databaseURL: "https://troublesome-dictionary-helper.firebaseio.com",
                storageBucket: "troublesome-dictionary-helper.appspot.com"
            };
            console.log(firebase, util);
            firebase.initializeApp(config);
            //this.setEventListener();
            //this.clear();
        },

        setEventListener: function (){
            chrome.storage.onChanged.addListener(function (changes, namespace){
                for(key in changes){
                    var storageChange = changes[key];
                    //console.log('old ', storageChange.oldValue);
                    //console.log('new ', storageChange.newValue);
                    var bytes = util.getByteLength(JSON.stringify(storageChange.newValue));
                    console.log(storageChange, ' [on change] chrome storage size : ', bytes + ' b', ' ', (bytes / 1024).toFixed(2) + ' kb', ' ', (bytes / 1024 / 1024).toFixed(2) + ' mb');
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