$(document).ready(function() {

    <!--Login function-->
    $("#LoginButton").click(function () {
        <!--Create variable-->
        var signinInfo = {
            username : $("#username").val(),
            password : $("#password").val()
        };
        <!--parameters-->
        var settings = {
            "async" : true,
            "url": "http://localhost:8888/api/login/",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(signinInfo)
    };  <!--Refresh site with variable parameters-->
        $.ajax(settings).done(function (response) {
            console.log(response);
            window.location.replace("MainMenu.html");
        });
    });

    <!--show games function-->
    $("#ShowGamesButton").click(function () {
        $.ajax().done(function () {
            console.log.url("localhost:888/api/games");
        });

    });










});