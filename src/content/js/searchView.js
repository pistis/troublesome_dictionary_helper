define('searchView', ['jquery', 'underscore', 'model'], function ($, _, model){
    
    var layerId = '_troublesome_searched_layer';
    var searchedResultClass = '_troublesome_searched_layer_cls_result';
    var elDoc = null;
    var fontSize = 9;

    var SearchView = {
        isActive: function (){
            return elDoc && elDoc.body;
        },
        
        setDocument: function (ownerDoc){
            elDoc = ownerDoc;
        },
        
        createLayer: function (){
            if(!this.isActive()){
                return;
            }
            
            var elLayer = this.getLayer();
            if(elLayer){
                return elLayer;
            }
            
            elLayer = elDoc.createElement('DIV');
            elLayer.setAttribute('id', layerId);
            elDoc.body.appendChild(elLayer);
            elLayer.className = searchedResultClass;
            elLayer.style.height = $(window).height() + 'px';

            return elLayer;
        },

        showLayer: function (){
            if(!this.isActive()){
                return;
            }
            var elLayer = this.getLayer();
            if(elLayer){
                elLayer.style.display = 'block';
            }
        },

        hideLayer: function (){
            if(!this.isActive()){
                return;
            }
            var elLayer = this.getLayer();
            if(elLayer){
                elLayer.style.display = 'none';
            }
        },
        
        getLayer: function (){
            return elDoc && elDoc.getElementById(layerId);
        },

        renderLayer: function (data){
            if(!this.isActive()){
                return;
            }
            var elLayer = this.createLayer();
            var zoom = 1.0;
            if(elDoc.body.style.zoom){
                zoom = parseFloat(elDoc.body.style.zoom);
            }
            $(elLayer).css({
                'font-size': String(fontSize / zoom) + 'pt'
            });

            this.renderContents(elLayer, data);
            this.showLayer();
        },

        renderContents: function (elLayer, data){
            if(!this.isActive()){
                return;
            }
            var elItem = elDoc.createElement('DIV');
            elLayer.setAttribute('id', layerId);
            elDoc.body.appendChild(elLayer);
            elLayer.className = searchedResultClass;

            var html = '<table><thead><th>Word</th><th>Means</th></thead><tbody>';
            _.each(data, function (value){
                html += '<tr><td>' + value.w + '</td>'
                    + '<td>' + value.m + '</td></tr>';
            });
            html += '</tbody></table>';
            elLayer.innerHTML = html;
        },

        isOccuredInLayer: function (e){
            var $elTarget = $(e.target);
            return $elTarget.attr('id') === layerId || $elTarget.parents('#' + layerId).length > 0;
        },

        onSetResult: function (data){
            var source = _(data).sortBy(function (item){
                return item.w;
            });
            console.log(source);
            this.renderLayer(source);
        }
    };

    model.getEvents().on('SET_RESULT', SearchView.onSetResult.bind(SearchView));
    
    return SearchView;
    
});