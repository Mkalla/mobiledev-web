/* Where our services live - Google maps, weather reporting etc. */
app.service('wthrService', ['$window', '$http', '$q', '$cordovaGeolocation', function($window, $http, $q, $cordovaGeolocation) {

    'use strict';

    this.getCurrentPosition = function() {
        var deferred = $q.defer();
        var pos;
		var posOptions = {
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 20000
		};

        $cordovaGeolocation.getCurrentPosition(posOptions).then(function(pos){
        	deferred.resolve(pos);
        }, function(error){
	    	alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
		});

        return deferred.promise;
    };

    this.getWeather = function(pos) {
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
            //console.log(closest);
            closest_id = closest.location.id; // The Met Office site ID for the closest weather station used when querying the Met forecast service(s)

			var loading_msg = $window.document.getElementsByClassName('weather-loading-message');
			if(loading_msg != null){
				for(var i=0; i < loading_msg.length; i++){
					loading_msg[i].innerHTML = 'Getting weather...';
				}
			}

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
				//console.log(weatherData);

				/* Output our weather */
				var weather_temp = $window.document.getElementsByClassName('weather-temp');
				if(weather_temp != null){
					for(var i=0; i < weather_temp.length; i++){
						weather_temp[i].innerHTML = weatherData.latestReport.T + ' ' + weatherData.Param[1].units;
					}
				}

				var weather_type = $window.document.getElementsByClassName('weather-type');
				if(weather_type != null){
					for(var i=0; i < weather_type.length; i++){
						/* Definitions from: http://www.metoffice.gov.uk/datapoint/support/documentation/code-definitions# */
						var weather_type_def = '';
						var weather_type_val = weatherData.latestReport.W;
						if(weather_type_val != 'NA') weather_type_val = Number(weather_type_val);

						switch(weather_type_val){
							case 'NA':
								weather_type_def = 'Not available';
							break;

							case 0:
								weather_type_def = 'Clear night';
							break;

							case 1:
								weather_type_def = 'Sunny day';
							break;

							case 2:
								weather_type_def = 'Partly cloudy (night)';
							break;

							case 3:
								weather_type_def = 'Partly cloudy (day)';
							break;

							case 4:
								weather_type_def = 'Not used';
							break;

							case 5:
								weather_type_def = 'Mist';
							break;

							case 6:
								weather_type_def = 'Fog';
							break;

							case 7:
								weather_type_def = 'Cloudy';
							break;

							case 8:
								weather_type_def = 'Overcast';
							break;

							case 9:
								weather_type_def = 'Light rain shower (night)';
							break;

							case 10:
								weather_type_def = 'Light rain shower (day)';
							break;

							case 11:
								weather_type_def = 'Drizzle';
							break;

							case 12:
								weather_type_def = 'Light rain';
							break;

							case 13:
								weather_type_def = 'Heavy rain shower (night)';
							break;

							case 14:
								weather_type_def = 'Heavy rain shower (day)';
							break;

							case 15:
								weather_type_def = 'Heavy rain';
							break;

							case 16:
								weather_type_def = 'Sleet shower (night)';
							break;

							case 17:
								weather_type_def = 'Sleet shower (day)';
							break;

							case 18:
								weather_type_def = 'Sleet';
							break;

							case 19:
								weather_type_def = 'Hail shower (night)';
							break;

							case 20:
								weather_type_def = 'Hail shower (day)';
							break;

							case 21:
								weather_type_def = 'Hail';
							break;

							case 22:
								weather_type_def = 'Light snow shower (night)';
							break;

							case 23:
								weather_type_def = 'Light snow shower (day)';
							break;

							case 24:
								weather_type_def = 'Light snow';
							break;

							case 25:
								weather_type_def = 'Heavy snow shower (night)';
							break;

							case 26:
								weather_type_def = 'Heavy snow shower (day)';
							break;

							case 27:
								weather_type_def = 'Heavy snow';
							break;

							case 28:
								weather_type_def = 'Thunder shower (night)';
							break;

							case 29:
								weather_type_def = 'Thunder shower (day)';
							break;

							case 30:
								weather_type_def = 'Thunder';
							break;

							default:
								weather_type_def = 'Not available';
							break;
						}

						weather_type[i].innerHTML = weather_type_def;
					}
				}

				var weather_hum = $window.document.getElementsByClassName('weather-humidity');
				if(weather_hum != null){
					for(var i=0; i < weather_hum.length; i++){
						weather_hum[i].innerHTML = weatherData.latestReport.H + weatherData.Param[9].units + ' humidity';
					}
				}

				var weather_wind = $window.document.getElementsByClassName('weather-wind');
				if(weather_wind != null){
					for(var i=0; i < weather_wind.length; i++){
						weather_wind[i].innerHTML = weatherData.latestReport.S + weatherData.Param[4].units + ' wind, ' + weatherData.latestReport.D;
					}
				}

				var weather_containers = $window.document.getElementsByClassName('weather-details');
				if(weather_containers != null){
					for(var i=0; i < weather_containers.length; i++){
						weather_containers[i].className = weather_containers[i].className + ' loaded';
					}
				}
				//return weatherData;
			};

			/* Our callback function to fire in case of an error */
			function getForecastOnError(error){
				alert('Weather request error:\n' + error);
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
					getForecastOnError(forecastXmlHttp.status);
				}
			};

			/* Make our request */
			forecastXmlHttp.open("GET", forecast_req, true);
			forecastXmlHttp.send();
		}

		function siteListOnError(response){
			alert('Met Office \"sitelist.json\" request error\n (Invalid Response) Status:' + response.status + ' Status Text: ' + response.statusText);
		}

		/* Let's try and get our weather data! */
		/*
		var req = '/lib/met-office/sitelist.json';

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function(){
			/* XMLHttpRequest().readyState definitions at: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState */
			/*
			if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
				var data = JSON.parse(xmlHttp.responseText);
				siteListOnSuccess(data, pos);
			}
			else if(xmlHttp.readyState == 4 && xmlHttp.status != 200){
				siteListOnError();
			}
		};
		*/

		/* Make our request
		xmlHttp.open("GET", req, true);
		xmlHttp.send();*/

		var req = '/lib/met-office/sitelist.json';

		if(ionic.Platform.isAndroid()){
			req = '/android_asset/www/lib/met-office/sitelist.json';
		}

		$http({
		  method: 'GET',
		  url: req
		}).then(function successCallback(response) {
			var data = response.data;
			siteListOnSuccess(data, pos);
		  }, function errorCallback(response) {
			siteListOnError();
		});
    };
}])
