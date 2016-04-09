/* Where our services live - Google maps, weather reporting etc. */
app.factory('wthrService', function(){
	/* Our weather data object that is returned by getWeather().onSuccess() */
	weatherData = {};
	weatherData.reqData;
	weatherData.w;

	return{
		getWeather: function(){
			/* Our function for a successful request that parses and outputs our weather data */
			function onSuccess(data){
				console.log(data);
				/* Return our weather data to the view */
				wthrJSON = data;
				weatherData.locData = wthrJSON.SiteRep.DV;
				weatherData.Param = wthrJSON.SiteRep.Wx.Param;
				console.log(weatherData);

				return weatherData;
			};

			/* Our callback function to fire in case of an error */
			function onError(error){
				alert('Weather request error\n (Invalid Response)');
			};

			/* Our current position, what we're getting and where our request from the MET Office is going to */
			var loc;

			/* MET Office data point URL explained here: http://www.metoffice.gov.uk/datapoint/getting-started */
			var baseURL = 'http://datapoint.metoffice.gov.uk/public/data/val/wxobs/all/json/';
			var qry = '3072?res=hourly';
			var key = '&key=3dd3210c-9aff-4547-9c28-9b590cc7d2c9';
			var req = baseURL + qry + key;

			/* Let's try and get our weather data! */
			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = function(){
				/* XMLHttpRequest().readyState definitions at: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState */
				if(xmlHttp.readyState == 4 && xmlHttp.status == 200){
					var data = JSON.parse(xmlHttp.responseText);
					onSuccess(data);
				}
				else if(xmlHttp.readyState == 4 && xmlHttp.status != 200){
					onError();
				}
			};

			/* Make our request */
			xmlHttp.open("GET", req, true);
			xmlHttp.send();
		}
	}
})