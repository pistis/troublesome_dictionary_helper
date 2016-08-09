define('app', ['event'], function(event){

    var App = {
        run : function(){
            console.log('Initialize Troublesome Dictionary Helper App');
            event.initialize();
        }
    };

    return App;
});