/**
 * Implementation of the Observer pattern
 */
define('events', [], function (){

    var Events = function(){
        this._listeners = {};
        this._listenerId = 0;
    };

    Events.prototype = {
        on : function(type, listener){
            if(!this._listeners[type]){
                this._listeners[type] = {};
            }
            this._listenerId++;

            this._listeners[type][this._listenerId] = listener;
        },

        off : function(type, listener){
            if(!this._listeners || !this._listeners[type]){
                return false;
            }
            var id;
            if(typeof listener === 'function'){         // remove specific listener for event type
                for(id in this._listeners[type]){
                    if(this._listeners[type].hasOwnProperty(id)){
                        if(this._listeners[type][id] === listener){
                            delete this._listeners[type][id];
                            break;
                        }
                    }
                }
                return !this._listeners[type][id];
            }else{                                      // remove all listener for event type
                for(id in this._listeners[type]){
                    if(this._listeners[type].hasOwnProperty(id)){
                        delete this._listeners[type][id];
                    }
                }
                return true;
            }
        },

        trigger : function(type){
            if(!this._listeners || !this._listeners[type]){
                return false;
            }
            var args = Array.prototype.slice.call(arguments);
            args.shift();
            for(var id in this._listeners[type]){
                if(this._listeners[type].hasOwnProperty(id)){
                    this._listeners[type][id].apply(this, args);
                }
            }
        },

        getEvents : function(type){
            if(!type){
                return [];
            }
            if(!this._listeners[type]){
                return [];
            }
            var listeners = [];
            for(var id in this._listeners[type]){
                if(this._listeners[type].hasOwnProperty(id)){
                    listeners.push(this._listeners[type][id]);
                }
            }

            return listeners;
        }
    };

    return Events;
});
