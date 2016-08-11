define('tooltipView', ['jquery', 'config'], function ($, CONFIG){
    
    var tooltipId = '_troublesome_tooltip';
    var tooltipClass = '_troublesome_tooltip_cls';
    var tooltipQueryClass = '_troublesome_tooltip_cls_query';
    var tooltipResultClass = '_troublesome_tooltip_cls_result';
    var elDoc = null;
    var fontSize = 9;
    var offsetDistance = 10;
    var tooltipView = {
        isActive: function (){
            return elDoc && elDoc.body;
        },
        
        setDocument: function (ownerDoc){
            elDoc = ownerDoc;
        },
        
        createTooltip: function (){
            if(!this.isActive()){
                return;
            }
            
            var elTooltip = this.getTooltip();
            if(elTooltip){
                return elTooltip;
            }
            
            elTooltip = elDoc.createElement('DIV');
            elTooltip.setAttribute('id', tooltipId);
            elDoc.body.appendChild(elTooltip);
            elTooltip.className = tooltipClass;

            var elQuery = elDoc.createElement('SPAN');
            elQuery.className = tooltipQueryClass;
            elQuery.textContent = '';
            elTooltip.appendChild(elQuery);

            var elResult = elDoc.createElement('SPAN');
            elResult.className = tooltipResultClass;
            elResult.textContent = '';
            elTooltip.appendChild(elResult);

            return elTooltip;
        },

        removeTooltip: function (){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.getTooltip();
            if(elTooltip && elTooltip.parentNode){
                elTooltip.parentNode.removeChild(elTooltip);
            }
        },

        showTooltip: function (){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.getTooltip();
            if(elTooltip){
                elTooltip.style.display = 'block';
            }
        },

        hideTooltip: function (){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.getTooltip();
            if(elTooltip){
                elTooltip.style.display = 'none';
            }
        },

        isShowTooltip: function (){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.getTooltip();
            return elTooltip && elTooltip.style.display === 'block';
        },
        
        getTooltip: function (){
            return elDoc && elDoc.getElementById(tooltipId);
        },

        renderTooltip: function (type, data){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.createTooltip();
            var zoom = 1.0;
            if(elDoc.body.style.zoom){
                zoom = parseFloat(elDoc.body.style.zoom);
            }
            $(elTooltip).css({
                'display': 'block',
                'font-size': String(fontSize / zoom) + 'pt'
            });

            this.renderContents(type, data);
            this.setPositionTooltip(elTooltip, data.cursorX, data.cursorY);
            this.showTooltip();
        },

        renderContents: function (type, data){
            if(type === CONFIG.SEARCH_TYPE.WORD){
                var elQuery = document.querySelector('#' + tooltipId + ' .' + tooltipQueryClass);
                elQuery.textContent = data.query;

                var elResult = document.querySelector('#' + tooltipId + ' .' + tooltipResultClass);
                elResult.textContent = ' : ' + data.result;
            }else if(type === CONFIG.SEARCH_TYPE.SENTENCE){
                var elQuery = document.querySelector('#' + tooltipId + ' .' + tooltipQueryClass);
                elQuery.textContent = '';

                var elResult = document.querySelector('#' + tooltipId + ' .' + tooltipResultClass);
                elResult.textContent = data.result;
            }
        },
        
        setPositionTooltip: function (el, cursorX, cursorY){
            if(!this.isActive()){
                return;
            }
            var $win = $(window);
            var $el = $(el);
            var zoom = 1.0;
            if(elDoc.body.style.zoom){
                zoom = parseFloat(elDoc.body.style.zoom);
            }

            var top, left;
            top = (cursorY - parseInt(offsetDistance) - $el.height()) / zoom;  // UP
            //top = (cursorY + parseInt(offsetDistance)) / zoom;  // DOWN
            top = top < 0 ? 0 : top;

            var pYOffset = ($win.scrollTop()) / zoom;
            var viewportWidth = $win.width();
            var viewportHeight = $win.height();
            var posBottom = pYOffset + viewportHeight;
            if(top + $el.height() > posBottom)
                top = posBottom - $el.height();
            if(top < pYOffset){
                top = pYOffset;
            }
            $el.css({
                'top': String(top) + 'px'
            });

            if((parseFloat($el.css('left')) + parseFloat($el.height())) * zoom > $win.scrollLeft() + viewportWidth){
                left = $win.scrollLeft() + viewportWidth - parseFloat($el.width()) * zoom - 5;
            }else{
                left = cursorX;
            }
            $el.css({
                'left': String((left + offsetDistance) / zoom) + 'px'
            });
        },

        isOccuredInTooltip: function (e){
            var $elTarget = $(e.target);
            return $elTarget.attr('id') === tooltipId || $elTarget.parents('#' + tooltipId).length > 0
        }
    };
    
    return tooltipView;
    
});