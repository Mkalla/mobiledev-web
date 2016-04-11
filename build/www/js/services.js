/* Where our services live - Google maps, weather reporting etc. */
app.service('wthrService', ['$window', '$q', function($window, $q) {

    'use strict';
    this.getCurrentPosition = function() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    };

    this.getWeather = function(pos) {
        var deferred = $q.defer();
        var weatherData = {};

		function siteListOnSuccess(data, pos){
            var lat, lng, closest, closest_id, locations, loc_id, nearby, output = [],
                standpoint;

            lat = pos.coords.latitude;
            lng = pos.coords.longitude;

            /* find-locations.js parseJSON() method puts the Met Office monitoring locations list in the format it needs */
			locations = parseJSON(data);
		
			// where you are
            standpoint = new Location(null, "Your location", lat, lng);
			
			// just interested in the closest location in the list
            closest = $window.getNearest(standpoint, locations);
            console.log(closest);
            closest_id = closest.location.id; // The Met Office site ID for the closest weather station used when querying the Met forecast service(s)
            
			// or perhaps the 5 closest
            // nearby = getNNearest(standpoint, locations, 5);

            // console.log('closest station', closest);
            // console.log('nearby locations', nearby);

            // Let's assign the closest station's ID to our "loc_id" variable to use in our wthrService forecast service(s) query in services.js
            loc_id = closest_id;

			/* Our function for a successful request that parses and outputs our weather data */
			function getForecastOnSuccess(forecastData){
				/* Return our weather data to the view */
				var wthrJSON = forecastData;
				weatherData.locData = {};
				weatherData.locData.currentDayReps = wthrJSON.SiteRep.DV.Location.Period[1]; // The hourly weather readings for the current day
				var latestRepKey = (typeof wthrJSON.SiteRep.DV.Location.Period[1].Rep.length == 'undefined') ? 1 : wthrJSON.SiteRep.DV.Location.Period[1].Rep.length; // The length of the weather reports array per 24 hour time minus one, e.g. 8PM/2000hrs = 19
				
				if(latestRepKey == 1){
					weatherData.latestReport = wthrJSON.SiteRep.DV.Location.Period[1].Rep;
				}
				else{
					weatherData.latestReport = wthrJSON.SiteRep.DV.Location.Period[1].Rep[latestRepKey - 1];
				}

				weatherData.dataDate = wthrJSON.SiteRep.DV.dataDate; // The date the data requested is for
				weatherData.Param = wthrJSON.SiteRep.Wx.Param; // Explanation for the parameters for each of the weather objects (hourly)
				console.log(weatherData);
				return weatherData;
			};

			/* Our callback function to fire in case of an error */
			function getForecastOnError(error){
				alert('Weather request error\n (Invalid Response)');
			};

			/* MET Office data point URL explained here: http://www.metoffice.gov.uk/datapoint/getting-started */
			var baseURL = 'http://datapoint.metoffice.gov.uk/public/data/val/wxobs/all/json/';
			var qry = loc_id + '?res=hourly';
			var key = '&key=3dd3210c-9aff-4547-9c28-9b590cc7d2c9';
			var forecast_req = baseURL + qry + key;

			/* Let's try and get our weather data! */
			var forecastXmlHttp = new XMLHttpRequest();
			forecastXmlHttp.onreadystatechange = function(){
				/* XMLHttpRequest().readyState definitions at: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState */
				if(forecastXmlHttp.readyState == 4 && forecastXmlHttp.status == 200){
					var forecastData = JSON.parse(forecastXmlHttp.responseText);
					getForecastOnSuccess(forecastData);
				}
				else if(forecastXmlHttp.readyState == 4 && forecastXmlHttp.status != 200){
					getForecastOnError();
				}
			};

			/* Make our request */
			forecastXmlHttp.open("GET", forecast_req, true);
			forecastXmlHttp.send();
		}

		function siteListOnError(error){
			alert('Met Office \"sitelist.json\" request error\n (Invalid Response)');
		}

		var req = '/lib/met-office/sitelist.json';

		/* Let's try and get our weather data! */
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function(){
			/* XMLHttpRequest().readyState definitions at: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState */
			if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
				var data = JSON.parse(xmlHttp.responseText);
				siteListOnSuccess(data, pos);
			}
			else if(xmlHttp.readyState == 4 && xmlHttp.status != 200){
				siteListOnError();
			}
		};

		/* Make our request */
		xmlHttp.open("GET", req, true);
		xmlHttp.send();
    };
}])