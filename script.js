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
            url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=8665a048e7e7271136a54d23e66a244f&units=imperial",
            dataType: "JSON", 
            success: function(response){
                //create history link for search
                console.log(response);
                $("#today").empty();
                var title = $("<h1>").addClass("card-text").text(response.name);
                var newDate = new Date(response.dt*1000)
                var date = $("<h2>").addClass("card-text").text("Date: "+ newDate);

                var card = $("<div>").addClass("card");
                var wind = $("<p>").addClass("card-text").text("Wind speed: "+ response.wind.speed);
                var temp = $("<p>").addClass("card-text").text("Temperature: " + response.main.temp);
                var humid = $("<p>").addClass("card-text").text("Humidity: " + response.main.humidity);
                var cardBody = $("<div>").addClass("card-body");
                var icon = $("<img>").attr({
                    "src": "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png",
                    "alt": response.weather[0].description,
                    
                })
                
                cardBody.append(title, date, wind, humid, temp, icon)
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
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=8665a048e7e7271136a54d23e66a244f&units=imperial",
            dataType: "JSON", 
            success: function(response) {
                console.log(response);
                
                $("#forecast").html("<h4 class=\"mt3\">5 Day Forecast:</h4>").append("<div class=\"row\">");
                
                for (i = 0; i < response.list.length; i++){
                    if (response.list[i].dt_txt.indexOf("15:00:00")!== -1){
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
                        // var title = $("<h3>").addClass(card-text)("Day: "+ )
                        var icon = $("<img>").attr({
                            "src": "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png",
                            "alt": response.list[0].weather[0].description,
                            
                        })
                        var temp = $("<p>").addClass("card-text").text("Temp: " + response.list[i].main.temp_max);
                        var humid = $("<p>").addClass("card-text").text("Humid: " + response.list[i].main.humidity);
                        
                        col.append(card.append(body.append(temp, humid, icon)))//title and icon go here
                        $("#forecast .row").append(col)
                    }
                }
            }});
        }
        
        //getUVIndex function goes here
        
        
        //get current history, if any
        $(".list-group history").append(history);
        var history = JSON.parse(window.localStorage.getItem("history")) || [];
        
        if (history.length > 0) {
            searchWeather(history[history.length-1]);
            
        }
        
        for (var i = 0; i < history.length; i++) {
            makeRow(history[i]);
            
        }
    });