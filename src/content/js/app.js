define(['event'],function (event) {

    var App = {
        run : function() {
            console.log('Initialize App');
            event.initialize();
        }
    };

    return App;
});