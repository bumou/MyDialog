/**
 * Created by wangyy on 2016-9-2.
 */
(function ($) {
    var Dialog = function(config){
        var _this = this;
        _this.config = {
            buttons : [{
                type : "green",
                text : "确定"
            },{
                type : "red",
                text : "取消"
            }],
            opacity : "0.8",
            width : "auto",
            height : "auto",
            timeout : "",//默认不关闭
            message : "Are You Sure ?",
            type : "cancel"
        }
        this.body = $("body");
        this.container = $("<div class=\"dialog-container\">");
        this.win = $("<div class=\"dialog-window\">");
        this.header = $("<div class=\"dialog-header\">");
        this.content = $("<div class=\"dialog-content\">");
        this.footer = $("<div class=\"dialog-footer\">");
        if(config && $.isPlainObject(config)){
            $.extend(_this.config,config);
        }
        _this.create(_this.config);
    }
    window.Dialog = Dialog;
    $.Dialog= function(config){
        return new Dialog(config);
    }
    Dialog.prototype.create = function (config) {
            var _this = this;
            var body = _this.body,
            container = _this.container,
            win = _this.win,
            header = _this.header,
            content = _this.content,
            footer = _this.footer;
        if(config.type){
            header.addClass(config.type);
        }
        if(config.message){
            content.html(config.message);
        }
        if(config.width){
            win.width(config.width);
        }
        if(config.height){
            win.height(config.height);
        }
        if(config.buttons){
            _this.createbuttons(footer,config.buttons);
        }
            win.append(header);
            win.append(content);
            win.append(footer);
            container.append(win);
            body.append(container);
        if(config.timeout && config.timeout!=""){
            window.setTimeout(function () {
                _this.close();
            },config.timeout);
        }

        };
    Dialog.prototype.createbuttons  = function (footer, buttons) {
        var _this = this;
        $.each(buttons,function () {
            var _this2 = this;
            var buttonClass = _this2.type?_this2.type:"";
            var buttonText = _this2.text?_this2.text:"";
            var callback = _this2.callback?_this2.callback:function(){};
            var button = $("<button class="+buttonClass+">"+buttonText+"</button>");
            button.tap(function () {
                var isClose = callback();
                console.log(_this);
                if(isClose != false){
                    _this.close();
                }
            });
            footer.append(button);

        });
    };
    Dialog.prototype.close = function () {
        this.container.remove();
    }
})(Zepto)