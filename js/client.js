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

            <!--save id locally-->
            $.sessionStorage.set("id", response.userid);

            window.location.replace("MainMenu.html");
        });
    });
    <!--MENU BUTTONS-->

    <!--Show games button-->
        $("#ShowGamesButton").click(function () {
            window.location.replace("Games.html");
        });

    <!--Create game button-->
    $("#CreateNewGameButton").click(function () {
        window.location.replace("CreateGame.html");
    });

    <!--Join game button-->
    $("#StartNewGameButton").click(function () {
        window.location.replace("StartGame.html");
    });

    <!--Highscores button-->
    $("#HighScoreButton").click(function () {
        window.location.replace("HighScores.html");
    });

    <!--FUNCTIONS-->

    <!--Show open games function-->
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
                        + '</td></tr>';

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
            alert("Game Successfully Deleted");
            window.location.replace("MainMenu.html");

        });
    });

    <!--Join game function-->
    $("#JoinGame").click(function () {

        var joingameInfo = {

            gameId: $("#JoinGameID").val(),
            opponent: {
                id : $.sessionStorage.get("id")
        }};

        var settings = {
            "async": true,
            "url": 'http://localhost:11999/api/games/join/',
            "method": "POST",
            "data": JSON.stringify(joingameInfo)
    };
        $.ajax(settings).done(function (response) {
            console.log(response);
            alert("Game Successfully Joined");
            window.location.replace("MainMenu.html");
        });
    });

    <!--Create game function-->
    $("#CreateGame").click(function () {

        var creategameInfo = {

            name: $("#GameName").val(),
            mapSize: $("#MapSize").val(),
            host: {
                id: $.sessionStorage.get("id"),
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
            alert("Game Created");
            window.location.replace("MainMenu.html");
        });
    });

    <!--Show pending games function-->
    $("#ShowPendingGames").click(function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'http://localhost:11999/api/games/opponent/' + $.sessionStorage.get("id"),
            "method": "GET"
        };

        $.ajax(settings).done(function (response) {

            console.log(response);

            response.forEach(function (item) {

                var trHTML = '<tr><td>' + item.gameId + '</td><td>' + item.host.id + '</td><td>'
                    + item.opponent.id + '</td><td>' + item.name + '</td><td>' + item.created + '</td><td>'
                    + item.winner.id + '</td></tr>';

                $('#PendingGamesTable').append(trHTML);
            });
        });
    });
    <!--Start game function-->
    $("#StartGame").click(function () {

        var startgameInfo = {

            gameId: $("#PendingGameID").val(),
            opponent: {
                controls: $("#Controls").val()
            }
    };
        var settings = {
            "async": true,
            "url": 'http://localhost:11999/api/games/start',
            "method": "POST",
            "processData": false,
            "data": JSON.stringify(startgameInfo)
        };

        $.ajax(settings).done(function (response) {
            console.log(response);

            if (response.winner.id === $.sessionStorage.get("id")) {
                alert("Congratulations, You Won!")
            }
            else {
                alert("Sorry, You Lost!")
            }
            window.location.replace("MainMenu.html");
        });
    });
    <!--Show highscores function-->
    $("#ShowHighScores").click(function () {

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": 'http://localhost:11999/api/scores/',
            "method": "GET"
        };
        $.ajax(settings).done(function (response) {
            console.log(response);

            response.forEach(function (item) {

                var trHTML = '<tr><td>' + item.score + '</td><td>' + item.game.gameId + '</td><td>' +
                        item.user.username + '</td><td>' + item.game.name + '</td><td>' + item.game.created
                        + '</td></tr>';

                $('#HighScoreTable').append(trHTML);
            });
        })
    })
});