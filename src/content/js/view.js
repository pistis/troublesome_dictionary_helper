define(['jquery'], function($){
    
    var tooltipId = '_fast_tooltip';
    var tooltipClass = '_fast_tooltip_cls';
    var tooltipPlusClass = '_fast_tooltip_cls_plus';
    var tooltipResultClass = '_fast_tooltip_cls_result';
    var elDoc = null;
    var fontSize = 9;
    var offsetDistance = 10;
    var View = {
        isActive : function(){
            return elDoc && elDoc.body;
        },
        
        setDocument : function(ownerDoc){
            elDoc = ownerDoc;
        },
        
        createTooltip : function(){
            if(!this.isActive()){
                return;
            }
            
            var elTooltip = this.getTooltip();
            if(elTooltip){
                return elTooltip;
            }
            
            elTooltip = elDoc.createElement('DIV');
            elTooltip.setAttribute('id', tooltipId);
            elTooltip.style.setProperty('display', 'none', 'important');
            elTooltip.style.setProperty('visibility', 'hidden', 'important');
            elTooltip.style.setProperty('text-align', 'none', 'center');
            elTooltip.style.setProperty('position', 'absolute', 'important');
            elTooltip.style.setProperty('height', 'auto', 'important');
            elTooltip.style.setProperty('width', 'auto', 'important');
            elTooltip.style.setProperty('z-index', '1410065406', 'important');
            elTooltip.style.setProperty('vertical-align', 'middle', 'important');
            elTooltip.style.setProperty('padding', '2px 5px 2px 5px', 'important');
            elTooltip.style.setProperty('margin', '0px 0px 0px 0px', 'important');
            elTooltip.style.setProperty('align', 'absmiddle', 'important');
            elTooltip.style.setProperty('font-size', String(fontSize) + 'pt', 'important');
            elTooltip.style.setProperty('line-height', 'normal', 'important');
            elDoc.body.appendChild(elTooltip);
            elTooltip.className = tooltipClass;
            
            $(elTooltip).css({
                'z-index' : '999999999',
                'align' : 'absmiddle',
                'vertical-align' : 'middle',
                'padding' : '2px 5px 2px 5px',
                'font-family' : '맑은 고딕',
                'font-weight' : 'bold',
                'color' : '#000000',
                'border' : 'solid 0px #707070',
                'background' : '-webkit-gradient(linear, left top, left bottom, from(#F0F0F0), to(#DCDCDC))',
                'overflow' : 'hidden',
                'white-space' : 'nowrap',
                '-webkit-border-radius' : '.2em',
                '-webkit-box-shadow' : '2px 2px 5px rgba(0,0,0,.4)'
            });

            var elButton = elDoc.createElement('SPAN');
            elButton.className = tooltipPlusClass;
            elButton.textContent = '[+] ';
            elButton.style.cursor = 'pointer';
            elTooltip.appendChild(elButton);
            $(elButton).on('click', function(e){

            });

            var elResult = elDoc.createElement('SPAN');
            elResult.className = tooltipResultClass;
            elResult.textContent = '';
            elTooltip.appendChild(elResult);
            return elTooltip;
        },

        removeTooltip : function(){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.getTooltip();
            if(elTooltip && elTooltip.parentNode){
                elTooltip.parentNode.removeChild(elTooltip);
            }
        },

        showTooltip : function(){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.getTooltip();
            elTooltip.style.display = 'block';
        },

        hideTooltip : function(){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.getTooltip();
            elTooltip.style.display = 'none';
        },

        isShowTooltip : function(){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.getTooltip();
            return elTooltip.style.display === 'block';
        },
        
        getTooltip : function(){
            return elDoc && elDoc.getElementById(tooltipId);
        },
        
        renderTooltip : function(data){
            if(!this.isActive()){
                return;
            }
            var elTooltip = this.createTooltip();
            var zoom = 1.0;
            if(elDoc.body.style.zoom){
                zoom = parseFloat(elDoc.body.style.zoom);
            }
            elTooltip.style.setProperty('font-size', String(fontSize / zoom) + 'pt', 'important');
            elTooltip.style.setProperty('display', 'inline', 'important');
            elTooltip.style.setProperty('visibility', 'visible', 'important');
            var elResult = document.querySelector('#' + tooltipId + ' .' + tooltipResultClass);
            elResult.textContent = data.result;
            this.setPositionTooltip(elTooltip, data.cursorX, data.cursorY);
            this.showTooltip();
        },
        
        setPositionTooltip : function(el, cursorX, cursorY){
            if(!this.isActive()){
                return;
            }
            var zoom = 1.0;
            if(elDoc.body.style.zoom){
                zoom = parseFloat(elDoc.body.style.zoom);
            }
            
            var aTop = parseInt(elDoc.defaultView.getComputedStyle(el, null).getPropertyValue('top'));
            var aHeight = parseInt(elDoc.defaultView.getComputedStyle(el, null).getPropertyValue('height'));
            var clientWidth = window.document.body.clientWidth;
            var clientHeight = window.document.body.clientHeight;
            var top, left;
            top = (cursorY - parseInt(offsetDistance) - el.offsetHeight) / zoom;  // UP
            //top = (cursorY + parseInt(offsetDistance)) / zoom;  // DOWN
            top = top < 0 ? 0 : top;
            
            var pXOffset = (window.pageXOffset) / zoom;
            var pYOffset = (window.pageYOffset) / zoom;
            var viewportWidth = $(window).width();
            var viewportHeight = $(window).height();
            var posBottom = pYOffset + viewportHeight;
            if(top + el.offsetHeight > posBottom)
                top = posBottom - el.offsetHeight;
            if(top < pYOffset){
                top = pYOffset;
            }
            el.style.setProperty('top', String(top) + 'px', 'important');
            if((parseFloat(el.style.left) + parseFloat(el.offsetWidth)) * zoom > window.pageXOffset + viewportWidth){
                left = window.pageXOffset + viewportWidth - parseFloat(el.offsetWidth) * zoom - 5;
            }else{
                left = cursorX;
            }
            el.style.setProperty('left', String(left / zoom) + 'px', 'important')
        },

        isOccuredInTooltip : function(e){
            //console.log(e.target.id, e.target);
            var $elTarget = $(e.target);
            //console.log($elTarget.attr('id'));
            //console.log($elTarget.parents('#' + tooltipId).length);
            return $elTarget.attr('id') === tooltipId || $elTarget.parents('#' + tooltipId).length > 0
        }
    };
    
    return View;
    
});