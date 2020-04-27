/*************************操作DIV js 如弹出DIV  弹出遮盖层******************************/
/**
 * 得到当前浏览器的可视化高度 不包含滚动条一下的高度
 */
function getBodyHeight() {
    if (window.innerHeight != undefined) {
        return window.innerHeight;
    } else {
        var B = document.body, D = document.documentElement;
        return Math.min(D.clientHeight, B.clientHeight);
    }
}

/**
 * 根据屏幕大小得到不同弹出层宽度
 * @return 当前宽度百分比
 */
function getWidth() {
    var width = null;
    if ($(window).width() > 1500) {
        width = "60%";
    } else if ($(window).width() > 1200) {
        width = "65%";
    } else if ($(window).width() > 1000) {
        width = "70%";
    } else if ($(window).width() > 800) {
        width = "80%";
    } else if ($(window).width() > 700) {
        width = "90%";
    } else {
        width = "98%";
    }
    return width;
}

/**
 * 弹出一个层 并显示指定数据
 * @param jsonObjDIV 弹出层参数 里面包含
 * data_width 弹出层的宽度 一般为%
 * data_title 弹出层需要显示的标题
 * data_content 指定数据内容
 * @return String 当前打开的层
 */
function openwDiv(jsonObjDIV) {
    //取得名称为showDiv的DIV长度
    var div_length = divLength("showDiv");
    //为当前显示div创建一个新ID
    var showId = "showDiv" + div_length;
    //取得当前DIV中的各种参数属性
    var getid = "#" + showId;
    //得到宽度
    var width = getWidth();
    //设置div其他样式
    var z_index = parseInt(div_length) + 9;
    var title = jsonObjDIV.data_title;
    var dialogID = 'dialog' + div_length;
    //在页面中创造一个新的DIV并用户显示
    var divHtml = '<div id="' + showId + '" name="showDiv"><div class="dialog1"><div class="dialog1-head"><span class="close1 rotate1-hover" onclick="removeDiv(\'' + dialogID + '\')"></span><strong>' + title + '</strong></div><div class="dialog1-body" id="' + showId + 'body"><hr class="bg-white" /></div></div></div>';
    //操作遮盖曾
    var detail = "";
    var masklayout = $('<div class="dialog1-mask" id=' + dialogID + '></div>');
    //加入到body中
    $("body").append(masklayout);
    //设置显示div样式一起其他
    detail = '<div id="win' + dialogID + '"  class="dialog1-win" style="position:fixed;width:' + width + ';">';
    if (getid != null) {
        detail = detail + divHtml;
    }
    detail = detail + '</div>';
    var win = $(detail);
    win.find(".dialog1").addClass("open");
    //加入到body中
    $("body").append(win);
    //内容加载
    showDivContent(showId + 'body', jsonObjDIV.pageName);
    //取得body对应的width  和  heigth
    var x = parseInt($(window).width() - win.outerWidth()) / 2;
    var y = parseInt(getBodyHeight() - win.outerHeight()) / 8;
    //得到所有div下class='dialog-body'的元素
    var dc_body = win.find("div[class='dialog1-body']");
    //如果当前getBodyHeight()小于要显示层的height 这是我们做一个if处理
    if (getBodyHeight() < win.outerHeight()) {
        dc_body.css("height", getBodyHeight() - 100);
        y = parseInt(getBodyHeight() - (getBodyHeight() - 60)) / 3;
    }
    //设置显示DIV  x  y 样式
    if (y <= 10) {
        y = "10"
    }

    win.css("left", x + "px");
    win.css("top", y + "px");

    //设置z-index属性
    win.css("z-index", z_index);
    masklayout.css("z-index", (z_index - 1));
    $("#" + dialogID).click(function () {
        //点击其他区域  关闭当前层
        //removeDiv(dialogID);
    });
    //判断是否有回调
//	if(!isUndefinedAndEmpty(jsonObjDIV.methodName)){
//		doCallback(eval(jsonObjDIV.methodName), [ jsonObjDIV ]);
//	}
    return showId;
}


/**
 * 删除当前打开的的DIV
 * @param dialogID
 */
function removeDiv(dialogID) {
    //设置遮盖层点击消失事件
    $("#win" + dialogID).remove();
    $("#" + dialogID).remove();
    //将全局selectTrAll 恢复默认值
    selectTrAll = null;
}

/**
 * 点击取消按钮操作
 */
function cancelDiv() {
    $('#isUpdate').attr('value', 'n');
    removeDiv(getDivTopID());
}

/**
 * 将需要展示的内容存放在div中进行显示
 * @param showBodyId 需要存放的DIV
 * @param content 内容  html
 */
function showDivContent(showBodyId, pageName) {
    $("#" + showBodyId).load(pageName, function () {
    });
}

/**
 * 开启加载层
 * @return
 */
function showLoading() {
    //判断加载层是否存在
    if ($("#dialodIndex").length > 0) {
        $("#dialodIndex").show()
        return;
    }
    var div_length = divLength("loadingDiv");
    var divId = 'loadingDiv' + div_length;
    var styleCss = 'position:absolute;padding-top:15px;width: 150px;height:47px;background: #f9f9f9;z-index:10001;padding-left: 20px;';
    //在页面中创造一个新的DIV并用户显示
    var divHtml = '<div id="dialodIndex" ><div class="dialog1-mask" style="z-index:1000"></div><div id="' + divId + '" name="loadingDiv" class="margin padding border" style="' + styleCss + '"><img src="' + getRoot() + '/homePage/images/loading.gif" style="width: 20px;height: 20px"/>加载中...请稍后</div></div>';
    //拼加在body中
    $("body").append(divHtml);
    var win = $("#" + divId);
    var x = parseInt($(window).width() - 125) / 2;
    var y = parseInt(getBodyHeight() - 50) / 3;
    win.css({"left": x, "top": y});
}

/**
 * 关闭加载层
 * @return
 */
function hideLoading() {
    $("#dialodIndex").hide();
}


/**
 * 根据DIV  name属性  得到相同名称的个数
 * @param name
 * @return int
 */
function divLength(name) {
    //取得名称为showDiv的DIV长度
    return $('div[name=' + name + ']').length;
}

/**
 * 取得最顶层的弹出层ID
 * @return str  层ID
 */
function getDivTopID() {
    //取得最上
    var div_length = divLength("showDiv") - 1;
    return 'dialog' + div_length;
}

function getRoot() {
    return $("#rootPath").val();
}