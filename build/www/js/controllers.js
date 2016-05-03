app.controller("mainCtrl", function ($state, $rootScope, $ionicPlatform, $ionicHistory) {
  $rootScope.user = JSON.parse(window.localStorage.getItem("emergency-user"));
  $rootScope.reports = JSON.parse(window.localStorage.getItem("emergency-reports"));

  if($rootScope.reports == null){
    $rootScope.reports = new Array();
  }


  $ionicPlatform.ready(function () {

    if ($rootScope.user == null) {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go("app.register");
    }

  });
});

app.controller("menuCtrl", function ($scope, $ionicSideMenuDelegate, $ionicPopover) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $ionicPopover.fromTemplateUrl('templates/options-menu.html', {
    scope: $scope,
  }).then(function (popover) {
    $scope.popover = popover;
  });
});

app.controller('homeCtrl', function () {


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

app.controller('mapCtrl', function ($scope, $state, $cordovaGeolocation, $rootScope) {
  /* The options for our map */
  var posOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 20000
  };

  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
    /* Identify our canvas and placeholder */
    var canvas = document.getElementById('map-canvas');
    var placeholder = document.getElementById('placeholder');
    if (placeholder != null) placeholder.remove();

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

    geocoder.geocode({'location': myLatLng}, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Current Position',
            animation: google.maps.Animation.DROP
          });
          var address = results[0].formatted_address;
          $rootScope.address = address;

          /* Output address to map */
          if (document.getElementById('home-current-address') != null) document.getElementById('home-current-address').innerHTML = address.replace(/[,]/g, ',<br>');
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });


    /* Assign our map to the $scope of the current view and below is our error callback function */
    $scope.map = map;
  }, function (error) {
    alert('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
  });
})

app.controller('CameraCtrl', function ($state, $ionicPlatform, $scope, $rootScope, $cordovaCamera, $ionicHistory) {

  if($rootScope.vehicleImages == null) {
    $rootScope.vehicleImages = [];
  }
  if($rootScope.roadImages == null) {
    $rootScope.roadImages = [];
  }

  if($rootScope.witnessImages == null) {
    $rootScope.witnessImages = [];
  }

  if($rootScope.report == null) {
    $rootScope.report = {};
  }

  $scope.submit = function(){

    $rootScope.report.driver = $rootScope.user;
    $rootScope.report.vehicle.images = $rootScope.vehicleImages;
    $rootScope.report.road.images = $rootScope.roadImages;
    $rootScope.report.witness.images = $rootScope.witnessImages;
    $rootScope.report.date = new Date().toLocaleString();
    $rootScope.report.address = $rootScope.address;


    //Add report to existing reports
    $rootScope.reports.push($rootScope.report);

    //Save to local storage
    window.localStorage.setItem("emergency-reports", [JSON.stringify($rootScope.reports)]); //androids chrome is very picky. Needs to be an array


    $state.go("app.acc-rep-submit");
    $rootScope.report = null;
    $rootScope.vehicleImages = null;
    $rootScope.roadImages = null;
    $rootScope.witnessImages = null;


  };


  $ionicPlatform.ready(function () {
    $scope.takePicture = function (sender) {
      console.log("button clicked");
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 500,
        //targetHeight: 250,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };


      $cordovaCamera.getPicture(options).then(function (imgURI) {

        if (sender == "vehicle") {
          $rootScope.vehicleImages.push(imgURI);
        } else if (sender == "road") {
          $rootScope.roadImages.push(imgURI);
        } else if (sender == "witness") {
          $rootScope.witnessImages.push(imgURI);
        }
      }, function (err) {
        // error
        alert(err);
      });
    }
  });


  $scope.goBack = function () {
    console.log("clicked");
    $ionicHistory.goBack();
  }
});

app.controller('wthrCtrl', function ($ionicPlatform, $scope, $state, wthrService) {
  var pos;

  wthrService.getCurrentPosition().then(function (data) {
    pos = data;
    $scope.weather = wthrService.getWeather(pos);
  });
})

app.controller('faqCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

app.controller('termsCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

app.controller('registerCtrl', function ($scope, $rootScope, $ionicSideMenuDelegate, $state) {

  $scope.user = {};

  if ($rootScope.user)
    $scope.user = $rootScope.user;

  $scope.submit = function () {
    $rootScope.user = $scope.user;

    //Save data
    window.localStorage.setItem("emergency-user", [JSON.stringify($scope.user)]); //androids chrome is very picky. Needs to be an array
    $state.go('app.register-done');
  };


  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
});

app.controller('emContactsCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

app.controller('logonCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

app.controller('emReactCtrl', function ($scope, $ionicSideMenuDelegate, $ionicHistory) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.goBack = function () {
    $ionicHistory.goBack();
  }
})

app.controller('accRepCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

app.controller('accRepSglCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

app.controller('accRepListCtrl', function ($scope, $ionicSideMenuDelegate) {
  $scope.openMenu = function () {
    $ionicSideMenuDelegate.toggleLeft();
  };
})
