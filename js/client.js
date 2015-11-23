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
            "url": "http://localhost:11999/api/login/",
            "method": "POST",
            "processData": false,
            "data" : JSON.stringify(signinInfo)
    };  <!--Refresh site with variable parameters-->
        $.ajax(settings).done(function (response) {
            console.log(response);
            window.location.replace("MainMenu.html");
        });
    });

    <!--Show games button-->
        $("#ShowGamesButton").click(function () {
            window.location.replace("Games.html");
        });

        <!--Show games function-->
        $("#ShowGames").click(function () {

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:11999/api/games/open/",
                "method": "GET"
            };

            $.ajax(settings).done(function (response) {

                console.log(response);

                var trHTML = '';
                $.each(response, function (i, item) {
                    trHTML += '<tr><td>' + item.id + '</td><td>' + item.host.id + '</td><td>'
                        + item.opponent.id + '</td><td>' + item.name + '</td><td>' + item.created + '</td><td>'
                        + item.winner.id + '</td></tr>';


                    $('table').append(trHTML);
                    console.log(response);

                });
            });
        });

});