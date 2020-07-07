$(document).ready(function() {
    $("#search-button").on("click",function(){
        var cityName = $("#search-value").val();
        $("#search-value").val("");
        searchWeather(cityName);

    });
    $(".history").on("click", "li", function() {
        searchWeather($(this).text());


    });
    
    function makeRow(text) {

    }

    function searchWeather(cityName) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8665a048e7e7271136a54d23e66a244f&units=imperial",
            dataType: "JSON", 
            success: function(response){
                //create history link for search
                console.log(response);
                $("#today").empty();
                // var title = city name and current date
                var card = $("<div>").addClass("card");
                var wind = $("<p>").addClass("card-text").text("Wind speed: "+ response.wind.speed);
                var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp);
                var humid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity);
                var cardBody = $("<div>").addClass("card-body");
                // var icon =
                cardBody.append(wind, humid, temp)//put icon in here
                card.append(cardBody)
                $("#today").append(card);
                getForecast(cityName);
                // function getUVIndex()//not city name

            }

        });
    }

    function getForecast(cityName) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=8665a048e7e7271136a54d23e66a244f&units=imperial",
            dataType: "JSON", 
            success: function(response) {
                console.log(response);

                $("#forecast").html("<h4 class=\"mt3\">5 Day Forecast:</h4>").append("<div class=\"row\">");

                for (i = 0; i < response.list.length; i++){
                    if (response.list[i].dt_txt.indexOf("15:00:00")!== -1){
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
                        // var title = 
                        // var icon =
                        var temp = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp_max);
                        var humid = $("<p>").addClass("card-text").text("Humid: " + response.list[i].main.humidity);

                        col.append(card.append(body.append(temp, humid)))//title and icon go here
                        $("#forecast .row").append(col)
                }
            }
        }});
    }

    //getUVIndex function goes here


    //get current history, if any
    var history = JSON.parse(window.localStorage.getItem("history")) || [];

    if (history.length > 0) {
        searchWeather(history[history.length-1]);

    }

    for (var i = 0; i < history.length; i++) {
        makeRow(history[i]);
    }
});