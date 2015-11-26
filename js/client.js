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
            "data" : JSON.stringify(signinInfo)
    };  <!--Refresh site with variable parameters-->
        $.ajax(settings).done(function (response) {
            console.log(response);
            window.location.replace("MainMenu.html");

            <!--save id locally-->
            $.sessionStorage.setItem(id, response.userid);
        });
    });

    <!--Show games button-->
        $("#ShowGamesButton").click(function () {
            window.location.replace("Games.html");
        });

    <!--Create game button-->
    $("#CreateNewGameButton").click(function () {
        window.location.replace("CreateGame.html");
    });

    <!--Show games function-->
        $("#ShowGames").click(function () {

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://localhost:11999/api/games/open",
                "method": "GET"
            };

            $.ajax(settings).done(function (response) {

                console.log(response);

                response.forEach(function (item) {

                    var trHTML = '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>'
                        + item.opponent.id + '</td><td>' + item.name + '</td><td>' + item.created + '</td><td>'
                        + item.winner.id + '</td></tr>';

                    //console.log(trHTML);
                    $('#GamesTable').append(trHTML);
                });
            });
        });

    <!--Delete game function-->
    $("#DeleteGame").click(function () {

        var deleteGame = {

            "async": true,
            "crossDomain": true,
            "url": 'http://localhost:11999/api/games/' + $("#DeleteGameID").val(),
            "method": "POST"
        };

        $.ajax(deleteGame).done(function (response) {
            console.log(response);
            alert("Game Deleted");

        });
    });

    <!--Create game function-->
    $("#CreateGame").click(function () {

        var creategameInfo = {

            name: $("#GameName").val(),
            mapSize: $("#MapSize").val(),
            host: {
                id: $("id").get(),
                controls: $("#Moves").val()
            }};

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'http://localhost:11999/api/games/',
            "method": "POST",
            "data": JSON.stringify(creategameInfo)
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
            alert("Game Created")
        });




    });
});
