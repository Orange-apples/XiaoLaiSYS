$(document).ready(function () {
    $("#login_but1").click(function () {
        var user = $("#username").val().replace(/[ ]/g, "").replace(/[\r\n]/g, "");
        var pass = $("#password").val().replace(/[ ]/g, "").replace(/[\r\n]/g, "");
        //去掉回车换行
        var data = {
            'username': user,
            'password': pass
        };
        if (user == "") {
            $(".l_message").html("用户名不能为空");
        } else if (pass == "") {
            $(".l_message").html("密码不能为空");
        } else {
            $(".l_message").html("");
            $("#login_but1").prop("disabled", true);
            var login_flag = 0;//$("#emplChoice").val();
            var url = "";
            if (login_flag == 0) {
                url = 'system/user/toLogin.action';
            }
            $.ajax({
                url: url,
                data: data,
                type: 'POST',// html
                async: false,
                beforeSend: function (XMLHttpRequest) {
                },
                success: function (data1) {
                    if (data1.message == "-1") {
                        $(".l_message").html("用户名或密码错误");
                        $("#login_but1").prop("disabled", false);
                    } else if (data1.message == "success") {
                        $(".l_message").html("");
                        window.location.replace("homePage/index.jsp");
                    } else {
                        $(".l_message").html(data1.message);
                        $("#login_but1").prop("disabled", false);
                    }
                },
                complete: function () {
                    $("#login_but1").prop("disabled", false);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#login_but1").prop("disabled", false);
                    alert(errorThrown + " " + textStatus);
                }
            });
        }
    });
});