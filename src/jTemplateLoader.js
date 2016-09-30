
(function( window) {
    var jTemplateLoader = function(op){
        return new jTemplateLoader.prototype.init(op);
    };
    jTemplateLoader.prototype={

        constructor: jTemplateLoader,
        setOption:function(op){
            this.option =op;
        },
        cacheProperty:'jstemplate',

        getEngine:function(){
            if(window.Handlebars){
                return 'Handlebars';
            }else if(window.doT){
                return 'doT';
            }else if(window.jQuery && window.jQuery.tmpl){
                return 'jQuery.tmpl';
            }else{
                return null;
            }
        },
        tmplToHtml:function(tmpl,source){
            var engine = this.engine;
            var html = '';
            switch(engine)
            {
                case'Handlebars':
                    html=window.Handlebars.compile(tmpl)(source);
                    break;
                case 'doT':
                    html=window.doT.template(tmpl,undefined, source);
                    break;
                case 'jQuery.tmpl':
                    html=window.jQuery.tmpl(tmpl,source);
                    break;
                default:
                    html=window.Handlebars.compile(tmpl)(source);
            }
            return html;
        },
        getTmplLoader:function(){
            if(window.jQuery){
                return 'jQuery';
            }else if(window.fetch){
                return 'fetch';
            }else{
                return null;
            }
        },
        init:function(op){
            if(op){
                this.setOption(op);
            }
            var engine = this.getEngine();
            if(!engine){
                console.log("jTemplateLoader need templateEngine");
                return;
            }
            var loader = this.getTmplLoader();
            if(!loader){
                console.log("jTemplateLoader need AJAX loader");
                return;
            }
            this.loader =loader;
            this.engine =engine;
        },
        cacheTmpl:function(url,tpl){
            var cacheProperty =this.cacheProperty;
            if(!window[cacheProperty]){
                window[cacheProperty]={};
            }
            var cacheTemplate = window[cacheProperty];
            cacheTemplate[url] = tpl;
            //cacheTemplate[encodeURIComponent(url)] = tpl;
        },
        loaderTmpl:function(url,callback,source){
            var _this = this;
            var loader = this.loader;
            if(loader=='jQuery'){
                window.jQuery.get(url,function(response,status,xhr){
                    _this.cacheTmpl(url,response);
                    callback.call(_this,_this.tmplToHtml(response,source));
                },"text");
            }

        },
        html:function(url,source,callback){
            var _this = this;
            var cacheProperty =this.cacheProperty;
            if(window[cacheProperty] && window[cacheProperty][url]){
                return callback.call(_this,_this.tmplToHtml(window[cacheProperty][url],source));
            }
            _this.loaderTmpl(url,callback,source);
        }
    };
    jTemplateLoader.prototype.init.prototype = jTemplateLoader.prototype;
    if ( typeof window.jTemplateLoader !== "object") {
        window.jTemplateLoader = jTemplateLoader();
    }
    return window.jTemplateLoader;
}(typeof window !== "undefined" ? window : this));