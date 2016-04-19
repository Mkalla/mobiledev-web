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

		/* Get the approximate address! */
		var geocoder = new google.maps.Geocoder;

		geocoder.geocode({'location': myLatLng}, function(results, status) {
		    if (status === google.maps.GeocoderStatus.OK) {
		      if (results[1]) {
				var marker = new google.maps.Marker({position: myLatLng, map: map, title: 'Current Position', animation: google.maps.Animation.DROP});
		        var address = results[0].formatted_address;

		        /* Output address to map */
		        if(document.getElementById('home-current-address') != null) document.getElementById('home-current-address').innerHTML = address.replace(/[,]/g, ',<br>');
		      } else {
		        window.alert('No results found');
		      }
		    } else {
		      window.alert('Geocoder failed due to: ' + status);
		    }
		});


		/* Assign our map to the $scope of the current view and below is our error callback function */
	    $scope.map = map;
	}, function(error){
	    alert('code: '    + error.code    + '\n' +
	          'message: ' + error.message + '\n');
	});
})

app.controller('CameraCtrl', function($ionicPlatform, $scope, $cordovaCamera) {
  $ionicPlatform.ready(function() {
  	$scope.takePicture = function(){
	    var options = {
	      quality: 80,
	      destinationType: Camera.DestinationType.DATA_URL,
	      sourceType: Camera.PictureSourceType.CAMERA,
	      allowEdit: true,
	      encodingType: Camera.EncodingType.JPEG,
	      targetWidth: 100,
	      targetHeight: 100,
	      popoverOptions: CameraPopoverOptions,
	      saveToPhotoAlbum: false,
		  correctOrientation:true
	    };

	    $cordovaCamera.getPicture({}).then(function(imageData) {
	    	console.log(imageData);
	    	$scope.imgURI = "data:image/jpeg;base64," + imageData;

	      var image = document.getElementById('image');
	      alert('getPicture()');
	    }, function(err) {
	      // error
	      alert(err);
	    });
  	}
  });
})

app.controller('wthrCtrl', function($ionicPlatform, $scope, $state, wthrService){
	var pos;

	wthrService.getCurrentPosition().then(function(data){ 
		pos = data;
		$scope.weather = wthrService.getWeather(pos);
	});
})

app.controller('faqCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

app.controller('termsCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

app.controller('registerCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

app.controller('emContactsCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

app.controller('emReactCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

app.controller('accRepCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

app.controller('accRepSglCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})

app.controller('accRepListCtrl', function($scope, $ionicSideMenuDelegate){
	$scope.openMenu = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};
})