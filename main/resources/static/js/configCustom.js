$(document).ready(function () {
    $("#change_button").click(function () {
        $("#change-form").submit();
    });
    validate();

    function validate() {
        $("#change-form").validate({
            rules: {
                'user.name': {
                    required: true
                },
                'user.phone': {
                    required: true,
                    cellphone: true
                },
                'user.email': {
                    required: true,
                    email: true
                },
                'oldPass': {
                    required: true
                },
                'password': {
                    required: true,
                    rangelength: [8, 14]
                },
                'newPass': {
                    required: true,
                    equalTo: "#password"
                }
            },
            //设置提示信息
            messages: {
                'user.name': {
                    required: "请填写姓名"
                },
                'user.phone': {
                    required: "请填写联系电话",
                    cellphone: "请填写正确的联系电话"
                },
                'user.email': {
                    required: "请填写联系邮箱",
                    email: "请填写正确的邮箱"
                },
                'oldPass': {
                    required: "旧密码不能为空"
                },
                'password': {
                    required: "请输入密码",
                    rangelength: "密码长度必须在{0} 和 {1}之间"
                },
                'newPass': {
                    required: "再次输入密码",
                    equalTo: "两次密码不相同"
                }
            },
            //指定错误信息位置
            errorPlacement: function (error, element) {
                element.parent().find("span:last").append(error);
            },
            //设置验证触发事件
            focusInvalid: true,
            submitHandler: function (form) {
                var option = {
                    data: {},
                    beforeSubmit: function () {
                        return true;
                    },
                    success: function (data1) {
                        if (data1.message == "1") {
                            $("#oldPassError").text("旧密码错误");
                            $("#oldPass").focus();
                        } else {
                            window.location.replace("index.jsp");
                        }

                    }, error: function (jqXHR, textStatus, errorThrown) {
                    }
                };
                $('#change-form').ajaxSubmit(option);
            }
        });
    }
});