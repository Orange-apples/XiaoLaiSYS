$(document).ready(function () {
	$("#sidebar ul li ul li a").click(function () {
		//清空翻页Id数组和AllID数组
		arrayId = [];
		dataId = [];
		var url = $(this).attr("name");
//		alert(url);
		showLoading();
		$("#main-content").load(url, function () {
			checklogin();
		});
		hideInformation();
	});
	$("#home").click(function () {
		checklogin();
		$("#main").load("welcome.jsp");
	});
	$("#logout").click(function () {
		//confirmInformation("你确定要注销登陆么？",function(){
		$.ajax({
			url: '../system/user/logout.action',
			type: 'POST',// html
			beforeSend: function (XMLHttpRequest) {
			},
			success: function (data1) {
				window.location.replace("../login.jsp");
			},
			complete: function () {
			},
			error: function (jqXHR, textStatus, errorThrown) {
				alert(errorThrown + " " + textStatus);
			}
		});
		//});
	});
	$("#configP").click(function () {
		showLoading();
		var url = "../system/user/toPerson.action";
		$("#main-content").load(url, function () {
			hideLoading();
		});
	});
});
