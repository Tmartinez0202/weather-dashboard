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
            URL: "http://api.openweathcermap.org/data/2.5/weather?q=" + cityName + "&appid=28d0392fd231af34a615cad12d06976e&units=imperial",
            dataType: "JSON", 
            success: function(response){
                //create history link for search
                console.log(response);
                $("#today").empty();

            }

        });
    }

    function getForecast(searchValue) {
        $.ajax({

        });
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