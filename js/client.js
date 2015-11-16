$(document).ready(function() {

    <!--Login function-->
    $("#LoginButton").click(function () {
        var signinInfo = {
            username : $("#username").val(),
            password : $("#password").val()
        };
        <!--Create variable with parameters-->
        var settings = {
            "async" : true,
            <!--fra postman-->
            "url": "http://localhost:8888/api/login/",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(signinInfo)
    };  <!--Refresh site with variable-->
        $.ajax(settings).done(function (response) {
            console.log(response);
            window.location.replace("MainMenu.html");
        });
    });












});