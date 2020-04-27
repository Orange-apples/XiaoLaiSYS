$(document).ready(function () {
    $.ajaxSetup({
        contentType: "application/x-www-form-urlencoded;charset=utf-8",
        complete: function (XMLHttpRequest, textStatus) {
            // 通过XMLHttpRequest取得响应头，sessionstatus
            var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus");
            if (sessionstatus == "timeout") {
                // 这里怎么处理在你，这里跳转的登录页面
                window.location.replace("../login.jsp");
            }
        }
    });
});
// ----------------------------------------------弹出DIV仿模态窗口开始----------------------------------------------
var divW; // DIV宽度
var divH; // DIV高度
var clientH; // 浏览器高度
var clientW; // 浏览器宽度
var divTitle; // DIV标题
var pageUrl; // DIV中加载的页面
var div_X; // DIV横坐标
var div_Y; // DIV纵坐标
var indexZ = 999;

/** popUp窗口生成 * */
function DivWindowOpen(divWidth, divHeight, title, url, data) {
    divW = divWidth; // DIV宽度
    divH = divHeight; // DIV高度
    divTitle = title; // DIV高度
    pageUrl = url; // DIV中加载的页面UR
    lockScreen(); // 锁定背景
    divOpen();
    if (data == null) {
        data = {};
    }
    $("#divTitle").append(divTitle);
    $("#divContent").load(pageUrl, data);

    // 交换X图片
    $("#x").hover(function () {
        $(this).attr("src", "../images/Close-2.gif");
    }, function () {
        $(this).attr("src", "../images/Close-1.gif");
    });

    // 关闭DIV窗口
    $("#x").click(function () {
        clearDivWindow();
        clearLockScreen();
        if (messageFlag != []) {
            $("#tabs-3").hide();
            $("#tabs-4").hide();
            for (var i = 0; i < messageFlag.length; i++) {
                // alert(messageFlag.length);
                if (messageFlag[i] == 'outDate') {
                    $("#tabs-3").click();
                    $("#tabs-3").show();
                    $("#configTab").tabs({
                        selected: 0
                    });
                }
                if (messageFlag[i] == 'lack') {
                    $("#tabs-4").click();
                    $("#tabs-4").show();
                    $("#configTab").tabs({
                        selected: 1
                    });
                }
            }
        }
        ajax_showMessageFlag();
    });
    dargDIV();
}

function dargDIV() {
    var _move = false;// 移动标记
    var _x = 0, _y = 0;// 鼠标离控件左上角的相对位置
    $("#divTitle").click(function () {
        // alert("click");//点击（松开后触发）
    }).mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#divTitle").parent().css("left"));
        _y = e.pageY - parseInt($("#divTitle").parent().css("top"));
        $("#divTitle").parent().fadeTo(20, 0.5);// 点击后开始拖动并透明显示
    });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x;// 移动时根据鼠标位置计算控件左上角的绝对位置
            var y = e.pageY - _y;
            $("#divTitle").parent().css({
                top: y,
                left: x
            });// 控件新位置
        }
    }).mouseup(function () {
        _move = false;
        $("#divTitle").parent().fadeTo("divTitle", 1);// 松开鼠标后停止移动并恢复成不透明
    });
}

/** 返回弹出的DIV的坐标 * */
function divOpen() {
    var minTop = 80; // 弹出的DIV记顶部的最小距离
    if ($("#divWindow").length == 0) {
        clientH = $(window).height(); // 浏览器高度
        clientW = $(window).width(); // 浏览器宽度
        div_X = (clientW - divW) / 2; // DIV横坐标
        div_Y = (clientH - divH) / 2 - 80; // DIV纵坐标
        div_X += window.document.documentElement.scrollLeft; // DIV显示的实际横坐标
        div_Y += window.document.documentElement.scrollTop; // DIV显示的实际纵坐标
        if (div_Y < minTop) {
            div_Y = minTop;
        }
        $("body")
            .append(
                "<div id='divWindow' style='overFlow-x: hidden;'><div id='divTitle' style='cursor:move;'>"
                + "<img src='../images/Close-1.gif' id='x' /></div><div id='divContent' class='popuplist' style='overflow: hidden;'>"
                + "<img src='../images/waiting.gif' id='x' style='top:150px;right:470px;'/></div></div>"); // 增加DIV
        // divWindow的样式
        $("#divWindow").css("position", "absolute");
        $("#divWindow").css("z-index", 999);
        $("#divWindow").css("left", (div_X + "px")); // 定位DIV的横坐标
        $("#divWindow").css("top", (div_Y + "px")); // 定位DIV的纵坐标
        $("#divWindow").css("opacity", "1");
        $("#divWindow").width(divW);
        $("#divWindow").height(divH);
        $("#divWindow").css("background-color", "#FFFFFF");
        $("#divWindow").css("border", "solid 1px #d4dae8");
        $("#divWindow").css("overflow", "auto");
        // divTitle的样式
        $("#divTitle").css("height", "20px");
        $("#divTitle").css("line-height", "20px");
        // $("#divTitle").css("background-color", "#395a9d");
        $("#divTitle").css("padding", "3px 5px 1px 5px");
        $("#divTitle").css("color", "#FFFFFF");
        var theme = $("#session_theme").val();
        if (theme == "default_css") {
            $("#divTitle")
                .css("background",
                    "url(../js/image/ui-bg_diagonals-thick_22_1484e6_40x40_default_css.png)");
        } else if (theme == "themes1_css") {
            $("#divTitle")
                .css("background",
                    "url(../js/image/ui-bg_diagonals-thick_22_1484e6_40x40_themes1_css.png)");
        } else if (theme == "themes2_css") {
            $("#divTitle")
                .css("background",
                    "url(../js/image/ui-bg_diagonals-thick_22_1484e6_40x40_themes2_css.png)");
        } else if (theme == "themes3_css") {
            $("#divTitle")
                .css("background",
                    "url(../js/image/ui-bg_diagonals-thick_22_1484e6_40x40_themes3_css.png)");
        }
        $("#divTitle").css("font-weight", "bold");
        // x的样式
        $("#x").css("float", "right");
        $("#x").css("cursor", "pointer");
        // divContent的样式
        $("#divContent").css("padding", "10px");
    } else {
        clientH = $(window).height(); // 浏览器高度
        clientW = $(window).width(); // 浏览器宽度
        div_X = (clientW - divW) / 2; // DIV横坐标
        div_Y = (clientH - divH) / 2; // DIV纵坐标
        div_X += window.document.documentElement.scrollLeft; // DIV显示的实际横坐标
        div_Y += window.document.documentElement.scrollTop; // DIV显示的实际纵坐标
        if (div_Y < minTop) {
            div_Y = minTop;
        }
        $("#divWindow").css("left", (div_X + "px")); // 定位DIV的横坐标
        $("#divWindow").css("top", (div_Y + "px")); // 定位DIV的纵坐标
    }
}

/** 锁定背景屏幕 * */
function lockScreen() {
    if ($("#divLock").length == 0) { // 判断DIV是否存在
        clientH = $(window).height(); // 浏览器高度
        clientW = $(window).width(); // 浏览器宽度
        // var docH = $("body").height(); //网页高度
        // var docW = $("body").width(); //网页宽度
        // var bgW = clientW > docW ? clientW : docW; //取有效宽
        // var bgH = clientH > docH ? clientH : docH; //取有效高
        $("body").append("<div id='divLock'></div>"); // 增加DIV
        $("#divLock").height(clientH);
        $("#divLock").width(clientW);
        $("#divLock").css("display", "block");
        $("#divLock").css("background-color", "#000000");
        $("#divLock").css("position", "fixed");
        $("#divLock").css("z-index", "100");
        $("#divLock").css("top", "0px");
        $("#divLock").css("left", "0px");
        $("#divLock").css("opacity", "0.5");
    } else {
        clientH = $(window).height(); // 浏览器高度
        clientW = $(window).width(); // 浏览器宽度
        $("#divLock").height(clientH);
        $("#divLock").width(clientW);
    }
}

/** 清除背景锁定 * */
function clearLockScreen() {
    $("#divLock").remove();
}

/** 清除DIV窗口 * */
function clearDivWindow() {
    $("#divWindow").remove();
}

/** 窗口大小改变时 * */
$(window).resize(function () {
    if ($("#divLock").length != 0) {
        lockScreen();
    }
    if ($("#divWindow").length != 0) {
        divOpen();
    }
});

/**
 * 判断form的内容是否有改变
 *
 * @method isFormChanged
 * @param {element}
 *            el form对象
 * @param {string}
 *            filter (Optional) 过滤函数,会被循环调用传递给item作参数要求返回布尔值判断是否过滤
 * @return {bool} 是否改变
 */
function checkFormChanged(el, filter) {

    el = document.getElementById(el);

    filter = filter || function (el) {
        return false;
    };

    var els = el.elements, l = els.length, i = 0, j = 0, el, opts;

    for (; i < l; ++i, j = 0) {
        el = els[i];
        switch (el.type) {
            case "hidden":
            case "password":
            case "text":
            case "textarea":
                if (filter(el))
                    break;
                if (el.defaultValue != el.value)
                    return true;
                break;
            case "radio":
            case "checkbox":
                if (filter(el))
                    break;
                if (el.defaultChecked != el.checked)
                    return true;
                break;
            case "select-one":
                j = 1;
            case "select-multiple":
                if (filter(el))
                    break;
                opts = el.options;
                for (; j < opts.length; ++j) {
                    if (opts[j].defaultSelected != opts[j].selected)
                        return true;
                }
                break;
        }
    }

    return false;
}

/**
 * 提示成功信息
 */
function AlertInfo(information) {
    $("#successInfo").find("strong").html(information);
    var top = ($(window).height() - $("#successInfo").height()) / 2;
    var left = ($(window).width() - $("#successInfo").width()) / 2;
    var scrollTop = $(document).scrollTop();
    var scrollLeft = $(document).scrollLeft();
    $("#successInfo").css('z-index', '999999999');
    $("#successInfo").css({
        position: 'absolute',
        'top': top + scrollTop,
        left: left + scrollLeft
    }).show();
    setTimeout(function () {
        $("#successInfo").fadeOut(2500);
    }, 2500);
}

/**
 * 显示错误信息
 */
var isShowInformation = false;

function showInformation(information) {
    $('#effect').empty();
    $('#effect').css({
        'z-index': '99999'
    });
    $('#effect').append("<div>" + information + "</div>");

    function runEffect() {
        var selectedEffect = 'slide';
        // most effect types need no options passed by default
        var options = {};
        // some effects have required parameters
        if (selectedEffect === "scale") {
            options = {
                percent: 100
            };
        } else if (selectedEffect === "size") {
            options = {
                to: {
                    width: 280,
                    height: 185
                }
            };
        }
        $("#effect").show(selectedEffect, options, 500, callback);
        isShowInformation = true;
    }
    ;

    // callback function to bring a hidden box back
    function callback() {
    }
    ;
    runEffect();
}

/**
 * 隐藏错误信息
 */
function hideInformation() {
    $("#effect" + ":visible").removeAttr("style").fadeOut();
    isShowInformation = false;
}

/**
 * 提示框显示信息
 */
function showAlertDialog(information) {
    $("#img1").show();
    $("#dialog-message").dialog({
        resizable: false,
        modal: true,
        width: 450,
        height: 160,
        buttons: {
            "确定": function () {
                $(this).dialog("close");
            }
        }
    });
    $("#alertInfo").html(information);
    // setTimeout($("#dialog-message" ).dialog("close"),2000);
}

/**
 * confirm框
 */
function confirmInformation(information, callback) {
    $("#img2").show();
    $("#confirmInfo").html(information);
    return $("#dialog-confirm").dialog({
        resizable: false,
        height: 160,
        width: 400,
        modal: true,
        buttons: {
            "确定": function () {
                callback.call();
                $(this).dialog("close");
            },
            "取消": function () {
                $(this).dialog("close");
            }
        }
    });
}

/**
 * 查找是否有过期药品，并提示消息
 */
var messageFlag = [];

function ajax_showMessageFlag() {
//	messageFlag = [];
//	$("#new").hide();
//	$.ajax({
//		url : '../sysMaPage/medicine/isShowOutOfDateMedicine.action',
//		type : 'POST',
//		success : function(data) {
//			// alert(data.flag_outOfDate);
//			if (data.flag_outOfDate != '0') {
//				$("#new").show();
//				messageFlag.push('outDate');
//			}
//		}
//	});
//	$.ajax({
//		url : '../sysMaPage/medicine/isShowLackMedicine.action',
//		type : 'POST',
//		success : function(data2) {
//			// alert(data2.flag_outOfDate);
//			if (data2.flag_outOfDate != '0') {
//				$("#new").show();
//				messageFlag.push('lack');
//			}
//		}
//	});
}

/**
 * 显示loading窗口
 */
//function showLoading() {
//	$("#loading").show();
//	var h = $(document).height();
//	$(".overlay").css({
//		"height" : h
//	});
//	$(".overlay").css({
//		'display' : 'block',
//		'opacity' : '0.8'
//	});
//	$("#loading").stop(true).animate({
//		'margin-top' : '300px',
//		'opacity' : '1'
//	}, 200);
//}
/**
 * 隐藏loading窗口
 */
//function hideLoading(message) {
//	$("#loading").hide();
//	$(".overlay").css({
//		'display' : 'none',
//		'opacity' : '0'
//	});
//	$("#loading").stop(true).animate({
//		'margin-top' : '250px',
//		'opacity' : '0'
//	}, 400);
//	if (message != undefined) {
//		showAlertDialog(message);
//	}
//}
function showUpLoading() {
    var h = $(document).height();
    $(".uploadingWord").css({
        'display': 'block'
    });
    $(".overlay").css({
        "height": h
    });
    $(".overlay").css({
        'display': 'block',
        'opacity': '0.8'
    });
    $(".showbox1").stop(true).animate({
        'margin-top': '300px',
        'opacity': '1'
    }, 200);
}

/**
 * 分页差找的共通方法 mainWindowId 页面加载的主页ID menuBarId 工具栏的div的ID tableId 显示数据Table的ID
 * packageURL 页面资源包的ID dataId 数据的ID data 参数的集合 json 类型 data={}
 */
// 全局的存放当前list的多选的数据的ID
var dataId = [];
// 存放临时当前页的ID的数组
var arrayId = [];
// 是否被允许操作的标记主要用于修改
var isAllowOption = true;
// 当前正在执行修改操作的URL
var actionURL = null;
// 当前正在执行修改操作的ID数据
var needClearData = {};
// 普通分页的ID集合
var generalIdList = ['thisPage', 'pageAll', 'prePage', 'nextPage',
    'firstPage', 'lastPage', 'jump', 'jumpPage', 'load'];
// popUp分页的ID集合
var popUpIdList = ['thisPageofPopup', 'pageAllofPopup', 'prePageofPopup',
    'nextPageofPopup', 'firstPageofPopup', 'lastPageofPopup',
    'jumpofPopup', 'jumpPageofPopup'];

function toDateList(mainWindowId, menuBarId, tableId, packageURL, data,
                    hiddenName, IdList) {
    showLoading();
    /**
     * 清除全局List
     */
    clearSession(packageURL);
    $("#" + mainWindowId)
        .load(
            ".." + packageURL + "/toList.action",
            data,
            function () {
                selectData();
                hideLoading();
                $("#" + menuBarId).show();

                function showPage() {
                    dataId = [];
                    var thisPage = parseInt($("#" + IdList[0]).html());
                    var pageCount = parseInt($("#" + IdList[1]).html());
                    data['currentPage'] = thisPage;
                    data['totalPageAmount'] = pageCount;
                    // 上一页控制
                    $("#" + IdList[2])
                        .click(
                            function () {
                                showLoading();
                                $("#" + mainWindowId)
                                    .load(
                                        ".."
                                        + packageURL
                                        + "/toPrevious.action",
                                        data,
                                        function () {
                                            showPage();
                                            selectData();
                                            arrayId = [];
                                            hideLoading();
                                            loadIDs(
                                                packageURL,
                                                thisPage - 1,
                                                hiddenName,
                                                tableId);
                                        });
                            });
                    // 下一页控制
                    $("#" + IdList[3])
                        .click(
                            function () {
                                showLoading();
                                $("#" + mainWindowId)
                                    .load(
                                        ".."
                                        + packageURL
                                        + "/toNext.action",
                                        data,
                                        function () {
                                            showPage();
                                            selectData();
                                            arrayId = [];
                                            hideLoading();
                                            loadIDs(
                                                packageURL,
                                                thisPage + 1,
                                                hiddenName,
                                                tableId);
                                        });
                            });
                    // 首页控制
                    $("#" + IdList[4])
                        .click(
                            function () {
                                showLoading();
                                $("#" + mainWindowId)
                                    .load(
                                        ".."
                                        + packageURL
                                        + "/toFirst.action",
                                        data,
                                        function () {
                                            showPage();
                                            selectData();
                                            arrayId = [];
                                            hideLoading();
                                            loadIDs(
                                                packageURL,
                                                1,
                                                hiddenName,
                                                tableId);
                                        });
                            });
                    // 尾页控制
                    $("#" + IdList[5])
                        .click(
                            function () {
                                showLoading();
                                $("#" + mainWindowId)
                                    .load(
                                        ".."
                                        + packageURL
                                        + "/toLast.action",
                                        data,
                                        function () {
                                            showPage();
                                            selectData();
                                            arrayId = [];
                                            hideLoading();
                                            loadIDs(
                                                packageURL,
                                                pageCount,
                                                hiddenName,
                                                tableId);
                                        });
                            });
                    // 跳页控制
                    $("#" + IdList[6]).click(
                        function () {
                            var jumpValue = $("#" + IdList[7])
                                .val();
                            var jumpPage = null;
                            jumpValue = jumpValue.replace(/\s+/g, "");
                            if (jumpValue != ""
                                && !isNaN(jumpValue)) {
                                showLoading();
                                jumpPage = parseInt(jumpValue);
                                // TODO
                                // 需要check
                                if (pageCount < jumpPage) {
                                    jumpPage = pageCount;
                                } else if (jumpPage < 1) {
                                    jumpPage = 1;
                                }
                                data['toPageAmount'] = jumpPage;
                                $("#" + mainWindowId).load(
                                    ".." + packageURL
                                    + "/toPage.action",
                                    data,
                                    function () {
                                        showPage();
                                        selectData();
                                        arrayId = [];
                                        hideLoading();
                                        loadIDs(packageURL,
                                            jumpPage,
                                            hiddenName,
                                            tableId);
                                    });
                            }
                        });
                    $("#" + IdList[8]).click(
                        function () {
                            showLoading();
                            $("#" + mainWindowId).load(
                                ".." + packageURL
                                + "/toReload.action",
                                data, function () {
                                    showPage();
                                    selectData();
                                    arrayId = [];
                                    // loadIDs(packageURL,
                                    // jumpPage,
                                    // hiddenName, tableId);
                                    hideLoading();
                                });
                        });
                    // 全选控制
                    $("#selectAll").click(
                        function () {
                            selectAll(this, 'sel', tableId,
                                hiddenName, packageURL,
                                thisPage);
                            // alert(arrayId);
                        });
                    // 除了表头（第一行）以外所有的行添加click事件.
                    $("#" + tableId + " tbody tr")
                        .each(
                            function () {
                                /** 单点击 单选按钮事件 * */
                                $(this)
                                    .find("input:checkbox")
                                    .click(
                                        function () {
                                            // alert(hiddenName);
                                            var currentHiddenValue = $(
                                                this)
                                                .parent()
                                                .parent()
                                                .find(
                                                    "input[name='"
                                                    + hiddenName
                                                    + "']")
                                                .val();
                                            // alert("currentHiddenValue"+currentHiddenValue);
                                            if ($(this)
                                                .is(
                                                    ':checked')) {
//																		$(this)
//																				.parent()
//																				.parent()
//																				.css(
//																						"background-color",
//																						"#FBEC88");
                                                arrayId
                                                    .push(currentHiddenValue);
                                                // alert(arrayId);
                                            } else {
//																		$(this)
//																				.parent()
//																				.parent()
//																				.css(
//																						"background-color",
//																						"white");
                                                // alert("before"+arrayId);
                                                arrayId
                                                    .splice(
                                                        $
                                                            .inArray(
                                                                currentHiddenValue,
                                                                arrayId),
                                                        1);
                                                // alert("after");
                                            }
                                            selectOne(
                                                "selectAll",
                                                "sel");
                                            uploadIDs(
                                                arrayId,
                                                packageURL,
                                                thisPage);
                                            // alert(arrayId);
                                        });
                                /** 单点击 除了tr中的第一个td(包含单选按钮的td)的事件 * */
                                $(this)
                                    .find("td")
                                    .not(":eq(0)")
                                    .click(
                                        function () {
                                            var currentHiddenValue = $(
                                                this)
                                                .parent()
                                                .first()
                                                .find(
                                                    "input:hidden:eq(0)")
                                                .val();
                                            if ($(this)
                                                .parent()
                                                .find(
                                                    "td:eq(0)")
                                                .children()
                                                .first()
                                                .is(
                                                    ':checked')) {
//																		$(this).parent() .css( "background-color", "white");
                                                $(this)
                                                    .parent()
                                                    .find(
                                                        "td:eq(0)")
                                                    .children()
                                                    .first()
                                                    .prop(
                                                        "checked",
                                                        false);
                                                arrayId
                                                    .splice(
                                                        $
                                                            .inArray(
                                                                currentHiddenValue,
                                                                arrayId),
                                                        1);
                                                // alert(arrayId);
                                            } else {
                                                $(this)
                                                    .parent()
                                                    .find(
                                                        "td:eq(0)")
                                                    .children()
                                                    .first()
                                                    .prop(
                                                        "checked",
                                                        true);
//																		$(this).parent().css("background-color","#FBEC88");
                                                arrayId
                                                    .push(currentHiddenValue);
                                                // alert(arrayId);
                                            }
                                            selectOne(
                                                "selectAll",
                                                "sel");
                                            uploadIDs(
                                                arrayId,
                                                packageURL,
                                                thisPage);
                                        });
                            });
                }

                showPage();
            });

    function selectData() {
        $("#" + tableId + " tbody tr").hover(
            function () {
                if ($(this).find("td:eq(0)").children().first().is(
                    ':checked') == false) {
                    //$(this).css("background-color", "lightblue");
                }
            },
            function () {
                $("#" + tableId + " tbody tr").each(
                    function () {
                        if ($(this).find("td:eq(0)").children().first()
                            .is(':checked') == false) {
                            //$(this).css("background-color", "white");
                        }
                    });
            });
    }

    //$(function() {
    //	$("#tabs").tabs();
    //});
}

/**
 * @Description 实现全选功能,全选之后进行ID上传操作
 * @param id
 *            全选控件(checkbox)的ID
 * @param name
 *            所有子控件(checkbox)的name属性值
 * @param tableId
 *            所在table的ID
 * @param hiddenName
 *            隐藏字段的name属性值
 * @param packageURL
 *            对应action所在的包的路径
 */
function selectAll(id, name, tableId, hiddenName, packageURL, currentPage) {
    if (id.checked) {
        // var currentArray = [];
        $("#" + tableId + " tbody tr").each(function () {
            //$(this).css("background-color", "#FBEC88");
        });
        $("#" + tableId + " tbody input[name='" + hiddenName + "'] ").each(
            function () {
                var hidden = $(this).parent().find("td:first").find("input[name='" + name + "']:first");
                var p = hidden.is(':checked');
                // 如果没被选择就添加到数组中
                if (p == false) {
                    var v = $(this).val();
                    arrayId.push(v);
                    hidden.prop("checked", true);
                }
            });
        uploadIDs(arrayId, packageURL, currentPage);
    } else {
        $("#" + tableId + " tbody tr").each(function () {
            //$(this).css("background-color", "white");
        });
        $("#" + tableId + " tbody input[name='" + hiddenName + "'] ").each(
            function () {
                var hidden = $(this).parent().find("td:first").find("input[name='" + name + "']:first");
                var p = hidden.is(':checked');
                if (p == true) {
                    var v = $(this).val();
                    arrayId.splice($.inArray(v, arrayId), 1);
                    hidden.prop("checked", false);
                }
            });
        uploadIDs(arrayId, packageURL, currentPage);
    }
}

/**
 * @Description 实现单选功能
 * @param allId
 *            多选checkbox的ID
 * @param oneName
 *            当前checkbox的name
 */
function selectOne(allId, oneName) {
    if ($("input[name='" + oneName + "']:checked").length == $("input[name='"
        + oneName + "']").length) {
        $("#" + allId).prop("checked", true);
    } else {
        $("#" + allId).prop("checked", false);
    }
}

/**
 * @Description 上传单页ID
 * @param idArray
 *            选取的ID的数组
 * @param packageURL
 *            所在Action的package
 */
function uploadIDs(idArray, packageURL, currentPage) {
    var data = {
        'currentPage': currentPage
    };
//	alert("idArray"+idArray);
    if (idArray.length == 0) {
        data['stringIdArray'] = null;
    } else {
        data['stringIdArray'] = idArray.toString();
    }
    // alert(idArray);
//	 alert(packageURL);
    // alert(currentPage);
    $.ajax({
        url: '..' + packageURL + '/uploadIdCollection.action',
        type: 'POST',
        data: data,
        success: function (data) {
        }
    });
}

/**
 * @Description 加载单页ID
 * @param packageURL
 *            所在Action的package
 * @param currentPage
 *            要加载ID的页数
 */
function loadIDs(packageURL, currentPage, hiddenName, tableId) {
    var data = {
        'currentPage': currentPage
    };
    var array = null;
    var arrayNew = null;
    var currentArray = new Array();
    $
        .ajax({
            url: '..' + packageURL + '/loadIdCollection.action',
            type: 'POST',
            data: data,
            async: false,
            success: function (data) {
                array = data.currentPageIds;
                // alert(array);
                if (array != null) {
                    arrayNew = array.split(",");
                    $.each(arrayNew, function (key, value) {
                        // alert("arrayNew[key]:"+arrayNew[key]);
                        arrayId.push(arrayNew[key]);
                    });

                    // alert("test"+arrayId);
                    // alert("alert(arrayId)1;"+arrayId);
                    /**
                     * 把从后台传过来的Id集合，封装成新的id集合，供后面处理
                     */
                    for (var i = 0; i < arrayId.length; i++) {
                        currentArray.push(arrayId[i]);
                    }
                    /**
                     * 把从后台加载来的ID集合，标记成前台的已选
                     */
                    $(
                        "#" + tableId + " tbody input[name='" + hiddenName
                        + "'] ").each(
                        function () {
                            var value = $(this).val();
                            // alert("arrayId.length"+arrayId.length);
                            for (var i = 0; i < currentArray.length; i++) {
                                if (currentArray[i] == value) {
                                    currentArray.splice($.inArray(value,
                                        currentArray), 1);
                                    $(this).parent().find(
                                        "input[type='checkbox']").prop(
                                        "checked", true);
//											$(this).parent().css(
//													"background-color", "#FBEC88");
                                }
                            }
                        });
                    /**
                     * 如果加载的id正好满页,把全选控件标记为check
                     */
                    if ($("input[name='sel']:checked").length == $("input[name='sel']").length) {
                        $("#selectAll").prop("checked", true);
                    }
                    // alert("alert(arrayId);"+arrayId);
                }
            }
        });
}

/**
 * @Description 加载单页ID
 * @param packageURL
 *            所在Action的package
 */
function loadAllIds(packageURL) {
    // alert(packageURL);
    var array = null;
    var arrayNew = null;
    dataId = [];
    $.ajax({
        url: '..' + packageURL + '/loadAllIdCollection.action',
        type: 'POST',
        async: false,
        success: function (data) {
//			alert(data.currentAllIds);
            array = data.currentAllIds;
            if (array != null) {
                arrayNew = array.split(",");
                // alert(arrayNew.length);
                $.each(arrayNew, function (key, value) {
                    dataId.push(arrayNew[key]);
                });
            }
        }
    });
}

/**
 * @Description 清除session中的ID
 * @param packageURL
 *            对应Action的包名
 */
function clearSession(packageURL) {
    dataId = [];
    arrayId = [];
    $.ajax({
        url: '..' + packageURL + '/clearSessionForSearch.action',
        type: 'POST',
        async: false,
        success: function (data) {
            // alert("清除成功");
        }
    });
}

/**
 * @Description popup操作之后清空select标记
 * @param tableId
 *            当前的Table的ID
 */
function clearCurrentPageSelected(tableId) {
    $("#" + tableId + " tbody input[type='checkbox'] ").each(function () {
        $(this).prop("checked", false);
    });
    $("#selectAll").prop("checked", false);
}

/**
 * @Description 检查当前数据是否正在使用中
 * @param data
 *            要携带的参数
 * @param actionURL
 *            执行该动作的action的地址
 */
function checkUsing(data, actionURL) {
    var result = true;
    $.ajax({
        url: actionURL,
        data: data,
        type: 'POST',
        async: false,
        success: function (data1) {
            if (data1.message == "1") {
                showAlertDialog("当前数据正在处理中");
                result = false;
            } else if (data1.message == "2") {
                showAlertDialog("当前数据已经被删除,请重新加载数据");
                result = false;
            } else if (data1.message != "0") {
                showAlertDialog(data1.message + "编号的数据正在处理中,请重新选择");
                result = false;
            }
        }
    });
    return result;
}

/**
 * @Description 修改元组的Version
 * @param data
 *            要携带的参数
 * @param actionURL
 *            执行该动作的action的地址
 */
function modifyVersion(data, actionURL) {
    $.ajax({
        url: actionURL,
        data: data,
        type: 'POST',
        async: false,
        success: function (data) {
            isAllowOption = true;
            needClearData = {};
            actionURL = null;
        }
    });
}

/**
 * @Description 修改元组的Version
 * @param data
 *            要携带的参数
 * @param actionURL
 *            执行该动作的action的地址
 */
function getPurchaseBillState(d) {
    var state = 0;
    var data = {
        'purBill.pbId': parseInt(d)
    };
    $.ajax({
        url: "../purMaPage/purchaseBill/getPurchaseState.action",
        data: data,
        type: 'POST',
        async: false,
        success: function (data1) {
            state = parseInt(data1.message);
        }
    });
    return state;
}

/**
 * @Description 修改元组的Version
 * @param data
 *            要携带的参数
 * @param actionURL
 *            执行该动作的action的地址
 */
function getReturnBillState(d) {
    var state = 0;
    var data = {
        'returnBill.rbId': parseInt(d)
    };
    $.ajax({
        url: "../reseMaPage/returnedBill/getReturnState.action",
        data: data,
        type: 'POST',
        async: false,
        success: function (data1) {
            state = parseInt(data1.message);
        }
    });
    return state;
}

/**
 * 明细表tbody 显示效果和ID上传
 */
// 装载待删除的退货单明细ID的数组
var arrayForReBillDetail = [];

function tbody_show_For_return(tableID, hidden_name_pbd, hidden_name_rbd) {
    // 全选控制
    $("#selectAll").click(
        function () {

            if (this.checked) {
                $("#" + tableID + " tbody tr").each(function () {
//						$(this).css("background-color", "#FBEC88");
                });
                $(
                    "#" + tableID + " tbody input[name='"
                    + hidden_name_pbd + "'] ").each(
                    function () {
                        var p = $(this).parent().find(
                            "input[type='checkbox']")
                            .is(':checked');
                        // 如果没被选择就添加到数组中
                        if (p == false) {
                            var pbd_v = $(this).val();
                            var rbd_v = $(this).parent().find(
                                "input[name='" + hidden_name_rbd
                                + "']").val();
                            arrayId.push(pbd_v);
                            // alert("rbd_v="+rbd_v);
                            if (rbd_v != 0) {
                                arrayForReBillDetail.push(rbd_v);
                            }
                        }
                    });
                $("input[name='sel']").prop("checked", true);
            } else {
                $("#" + tableID + " tbody tr").each(function () {
//						$(this).css("background-color", "white");
                });
                $(
                    "#" + tableID + " tbody input[name='"
                    + hidden_name_pbd + "'] ").each(
                    function () {
                        var p = $(this).parent().find(
                            "input[type='checkbox']")
                            .is(':checked');
                        if (p == true) {
                            var v = $(this).val();
                            var rbd_v = $(this).parent().find(
                                "input[name='" + hidden_name_rbd
                                + "']").val();
                            // alert("rbd_v="+rbd_v);
                            arrayId.splice($.inArray(v, arrayId), 1);
                            if (rbd_v != 0) {
                                arrayForReBillDetail
                                    .splice($.inArray(rbd_v,
                                        arrayForReBillDetail),
                                        1);
                            }
                        }
                    });
                $("input[name='sel']").prop("checked", false);
            }
            // alert(arrayForReBillDetail.length);
        });
    // 单选控制
    $("#" + tableID + " tbody tr td input[name='sel']").click(
        function () {
            var currentHiddenValue = $(this).parent().parent().find(
                "input[name='" + hidden_name_pbd + "']").val();
            var currentHiddenValue_rbd = $(this).parent().parent().find(
                "input[name='" + hidden_name_rbd + "']").val();
            // alert("currentHiddenValue_rbd"+currentHiddenValue_rbd);
            if ($(this).is(':checked')) {
//					$(this).parent().parent()
//							.css("background-color", "#FBEC88");
                arrayId.push(currentHiddenValue);
                if (currentHiddenValue_rbd != 0) {
                    arrayForReBillDetail.push(currentHiddenValue_rbd);
                }
            } else {
//					$(this).parent().parent().css("background-color", "white");
                arrayId.splice($.inArray(currentHiddenValue, arrayId), 1);
                if (currentHiddenValue_rbd != 0) {
                    arrayForReBillDetail.splice($.inArray(
                        currentHiddenValue_rbd, arrayForReBillDetail),
                        1);
                }
            }
            selectOne("selectAll", "sel");
            // alert(arrayForReBillDetail.length);
        });
    // 鼠标经过显示颜色
    $("#" + tableID + " tbody tr")
        .hover(
            function () {
                if ($(this).find("td:eq(0)").children().first().is(
                    ':checked') == false) {
//							$(this).css("background-color", "lightblue");
                }
            },
            function () {
                $("#" + tableID + " tbody tr").each(
                    function () {
                        if ($(this).find("td:eq(0)").children()
                            .first().is(':checked') == false) {
//										$(this)
//												.css("background-color",
//														"white");
                        }
                    });
            });
}

/** 全局采购单ID * */
var purBill_id = null;
var sellBill_id = null;

/** 主菜单的布局方法 * */
function min_max_win() {
    $("#h3_head").click(
        function () {
            if ($("#topDIV").is(":visible")) {
                $("#topDIV").slideUp(700);
                $(this).find("a:eq(2)").html("最大化");
                $(this).find("a:eq(1)").attr('class',
                    'hospital-icon ui-icon-newwin');
                $("#h3_detail").find("a:eq(1)").html("最小化");
                $("#h3_detail").find("a:eq(0)").attr('class',
                    'hospital-icon ui-icon-minusthick');
                $("#bottomDIV").slideDown(700);
            } else {
                $("#topDIV").slideDown(700);
                $(this).find("a:eq(2)").html("最小化");
                $(this).find("a:eq(1)").attr('class',
                    'hospital-icon ui-icon-minusthick');
                $("#h3_detail").find("a:eq(1)").html("最大化");
                $("#h3_detail").find("a:eq(0)").attr('class',
                    'hospital-icon ui-icon-newwin');
                $("#bottomDIV").slideUp(700);
            }
        });
    $("#h3_detail").click(
        function () {
            if ($("#bottomDIV").is(":visible")) {
                $("#bottomDIV").slideUp(700);
                $(this).find("a:eq(1)").html("最大化");
                $(this).find("a:eq(0)").attr('class',
                    'hospital-icon ui-icon-newwin');
                $("#h3_head").find("a:eq(2)").html("最小化");
                $("#h3_head").find("a:eq(1)").attr('class',
                    'hospital-icon ui-icon-minusthick');
                $("#topDIV").slideDown(700);
            } else {
                $("#bottomDIV").slideDown(700);
                $(this).find("a:eq(1)").html("最小化");
                $(this).find("a:eq(0)").attr('class',
                    'hospital-icon ui-icon-minusthick');
                $("#h3_head").find("a:eq(2)").html("最大化");
                $("#h3_head").find("a:eq(1)").attr('class',
                    'hospital-icon ui-icon-newwin');
                $("#topDIV").slideUp(700);
            }
        });
}

function priceFormat(id) {
    var priceIn = document.getElementById(id).value;
    //it is not a number
    if (isNaN(priceIn)) {
        return false;
    }
    // is '0000'
    if (priceIn == "000000000") {
        priceIn = "0";
    }
    if (priceIn.substring(0, 8) == "00000000") {
        priceIn = priceIn.substring(7, priceIn.length);
    }
    if (priceIn.substring(0, 7) == "0000000") {
        priceIn = priceIn.substring(6, priceIn.length);
    }
    if (priceIn.substring(0, 6) == "000000") {
        priceIn = priceIn.substring(5, priceIn.length);
    }
    if (priceIn.substring(0, 5) == "00000") {
        priceIn = priceIn.substring(4, priceIn.length);
    }
    if (priceIn.substring(0, 4) == "0000") {
        priceIn = priceIn.substring(3, priceIn.length);
    }
    // the first are '000'
    if (priceIn.substring(0, 3) == "000") {
        priceIn = priceIn.substring(2, priceIn.length);
    }
    // the first are '00'
    if (priceIn.substring(0, 2) == "00") {
        priceIn = priceIn.substring(1, priceIn.length);
    }
    //the first are '00'
    if (priceIn.substring(0, 1) == "0") {
        priceIn = priceIn.substring(1, priceIn.length);
    }
    // if the first is '.' add '0' at first
    if (priceIn.substring(0, 1) == ".") {
        if (priceIn.length <= 6) {
            priceIn = "0" + priceIn;
        }
    }
    if (priceIn.length <= 8) {
        if (priceIn.indexOf(".") == (priceIn.length - 1)) {
            priceIn = priceIn + "0";
        }
    }
    if (priceIn.length <= 8) {
        if (priceIn.indexOf(".") == -1) {
            priceIn = priceIn + ".0";
        }
    }
    //the point's index
    var point_index = priceIn.indexOf(".");
    // get the first position of the last point
    if (point_index >= 0) {
        var price_val = priceIn.substring(point_index + 1, priceIn.length);
        if (price_val.length > 1) {
            priceIn = priceIn.substring(0, priceIn.length - price_val.length
                + 1);
        }
    }
    document.getElementById(id).value = priceIn;
}

function removeAttribuate(id) {
    $("#" + id).removeAttr("style");//.fadeOut();
    $("#" + id).attr('style', 'right: 30px; top: 53px;');
}

function showAttribuate(id) {
    $("#" + id).attr('style', 'right: 30px; top: 100px;');
}

/**
 * 采购模块的搜索栏的显示与隐藏
 */
function toolBar() {
    $("#choice_pur").change(function () {
        var v = $(this).val();
        if (v == 1 || v == 4) {
            $("#time_pur").show();
            $("#state_pur").hide();
            $("#se_but_forPur_All").hide();
        } else if (v == 2) {
            $("#time_pur").hide();
            $("#state_pur").show();
            $("#se_but_forPur_All").hide();
        } else if (v == 3) {
            $("#state_pur").hide();
            $("#time_pur").hide();
            $("#se_but_forPur_All").show();
        } else {
            $("#state_pur").hide();
            $("#time_pur").hide();
            $("#se_but_forPur_All").hide();
        }
    });
}

function openMyModel(width, height, modelId) {
    var minTop = 40; // 弹出的DIV记顶部的最小距离
    var clientH = $(window).height(); // 浏览器高度
    var clientW = $(window).width(); // 浏览器宽度
    var div_X = (clientW - width) / 2; // DIV横坐标
    var div_Y = (clientH - height) / 2 - 80; // DIV纵坐标
    div_X += window.document.documentElement.scrollLeft; // DIV显示的实际横坐标
    div_Y += window.document.documentElement.scrollTop; // DIV显示的实际纵坐标
    if (div_Y < minTop) {
        div_Y = minTop;
    }
    $('#' + modelId).css({
        "position": "absolute",
        'width': (width + "px"),
        'height': (height + "px"),
        "left": (div_X + "px"),
        "top": (div_Y + "px")
    });
    $('#' + modelId).modal('show');
}

function checklogin() {
    clearSession("/system/user");
}