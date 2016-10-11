(function (global, factory) {
    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jTemplateLoader requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
    var jTemplateLoader = function (op) {
        return new jTemplateLoader.prototype.init(op);
    };
    jTemplateLoader.fn = jTemplateLoader.prototype = {

        constructor: jTemplateLoader,
        setOption: function (op) {
            var odj = this.option;
            for (var key in op){
                odj[key] = op[key];
            }
        },
        getEngine: function () {
            if (window.Handlebars) {
                return 'Handlebars';
            } else if (window.doT) {
                return 'doT';
            } else if (window.jQuery && window.jQuery.tmpl) {
                return 'jQuery.tmpl';
            } else {
                return null;
            }
        },
        tmplToHtml: function (tmpl, source) {
            var engine = this.engine;
            var html = '';
            switch (engine) {
                case'Handlebars':
                    html = window.Handlebars.compile(tmpl)(source);
                    break;
                case 'doT':
                    html = window.doT.template(tmpl, undefined, source);
                    break;
                case 'jQuery.tmpl':
                    html = window.jQuery.tmpl(tmpl, source);
                    break;
                default:
                    html = window.Handlebars.compile(tmpl)(source);
            }
            return html;
        },
        getTmplLoader: function () {
            if (window.jQuery) {
                return 'jQuery';
            } else if (window.fetch) {
                return 'fetch';
            } else {
                return null;
            }
        },
        init: function (op) {
            this.option = {cacheProperty: 'jstemplate', loadTimer: 5000};
            this.setOption(op);
            var cacheProperty = this.option.cacheProperty;
            if (!window[cacheProperty]) {
                window[cacheProperty] = {};
            }
            var engine = this.getEngine();
            if (!engine) {
                throw Error("jTemplateLoader need templateEngine");
                return;
            }
            var loader = this.getTmplLoader();
            if (!loader) {
                throw Error("jTemplateLoader need AJAX loader");
                return;
            }
            this.loader = loader;
            this.engine = engine;
            if(this.option.templates){
                this.loadAllTemplate();
            }
        },
        loadAllTemplate:function(){
            var templates =this.option.templates;
            for(var i = 0,len=templates.length;i<len;i++){
                this.loaderTmpl(templates[i]);
            }
        },
        cacheTmpl: function (url, tpl) {
            var cacheProperty = this.option.cacheProperty;
            var cacheTemplate = window[cacheProperty];
            cacheTemplate[url] = tpl;
        },
        loaderTmpl: function (url, source ,callback) {
            var _this = this;
            var loader = this.loader;
            if (loader == 'jQuery') {
                window.jQuery.get(url, function (response, status, xhr) {
                    _this.cacheTmpl(url, response);
                    if(source){
                        callback.call(_this, _this.tmplToHtml(response, source));
                    }
                }, "text");
            }

        },
        getCacheTmpl: function (url) {
            var cacheProperty = this.option.cacheProperty;
            if (window[cacheProperty] && window[cacheProperty][url]) {
                return window[cacheProperty][url];
            }
            return '';
        },
        load: function (url, source, callback) {
            var _this = this;
            var cacheProperty = this.option.cacheProperty;
            if (this.getCacheTmpl(url) != '') {
                return callback.call(_this, _this.tmplToHtml(window[cacheProperty][url], source));
            } else {
                _this.loaderTmpl(url, source ,callback);
            }
        },
        html: function (url, source) {
            var tmp = this.getCacheTmpl(url);
            if (tmp == '') {
                return '';
            }
            return this.tmplToHtml(tmp, source)
        },
        checkCache: function (callback) {
            var _this = this;
            var cacheProperty = this.option.cacheProperty;
            var templates = this.option.templates;
            var loadTimer = this.option.loadTimer;
            var t = 500;
            var loadTimes = 0;
            if (templates) {
                _this.timer = setInterval(function () {
                    var isAllCache = true;
                    for (var i = 0, len = templates.length; i < len; i++) {
                        if (!window[cacheProperty][templates[i]]) {
                            isAllCache = false;
                        }
                    }
                    if (isAllCache) {
                        clearInterval(_this.timer);
                        callback();
                    }
                    loadTimes += t;
                    if (t > loadTimer) {
                        clearInterval(_this.timer);
                        throw Error('template load timeout');
                    }
                }, t);
            }else{
                throw Error('template url is wrong');
            }
        },
        ready: function (callback) {
            this.checkCache(callback);
        }
    };
    jTemplateLoader.prototype.init.prototype = jTemplateLoader.prototype;

    if (typeof define === "function" && define.amd) {
        define("jTemplateLoader", [], function () {
            return jTemplateLoader;
        });
    }

    if (!noGlobal) {
        window.jTemplateLoader = window.jTem = jTemplateLoader;
    }
    return jTemplateLoader;

});