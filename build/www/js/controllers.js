app.controller('homeCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};

	/* Clock */
	var time = document.getElementById('home-time'),
		date = document.getElementById('home-date')
	        dateObj = null;

	var update = function () {
		time = document.getElementById('home-time');
		date = document.getElementById('home-date');
	    dateObj = moment(new Date());
	    time.innerHTML = dateObj.format('h:mm A');
	    date.innerHTML = dateObj.format('dddd, MMMM Do YYYY');
	};

	/* Init functions */
    update();
    setInterval(update, 1000 * 10);
})

app.controller('faqCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

app.controller('mapCtrl', function($scope, $state, $cordovaGeolocation){
	/* The options for our map */
	var posOptions = {
		enableHighAccuracy: true,
		timeout: 10000,
		maximumAge: 20000
	};

	$cordovaGeolocation.getCurrentPosition(posOptions).then(function(position){
		/* Identify our canvas and placeholder */
		var canvas = document.getElementById('map-canvas');
	    var placeholder = document.getElementById('placeholder');
	    if(placeholder != null) placeholder.remove();

	    /* Create our map element and output it */
	    var m = document.createElement("DIV");
		m.id = "map";	    

		/* Disable user drag input for the map so it doesn't move about and add it inside our #map-canvas element */
	    var att = document.createAttribute("data-tap-disabled");
	    att.value = "true";
	    m.setAttributeNode(att);
	    canvas.innerHTML = canvas.innerHTML + m.outerHTML;

	    /* Position data setup and output */
	    var lat = position.coords.latitude;
	    var lng = position.coords.longitude;

	    var myLatLng = new google.maps.LatLng(lat, lng);

	    /* Map options object */
        var mapOptions = {
            center: myLatLng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };

        /* Let's get our map and add a position marker to it! */
	    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
		var marker = new google.maps.Marker({position: myLatLng, map: map, title: 'Current Position', animation: google.maps.Animation.DROP});

		/* Assign our map to the $scope of the current view and below is our error callback function */
	    $scope.map = map;
	}, function(error){
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	});
})

app.controller('wthrCtrl', function($ionicPlatform, $scope, $state, wthrService){
	$ionicPlatform.ready(function(){
		var pos;
		var site_id;

    	wthrService.getCurrentPosition().then(function(data){ 
    		pos = data;
    		$scope.weather = wthrService.getWeather(pos);
    		console.log($scope.weather);
    	});

    	//wthrService.getSiteId();
	});
})

