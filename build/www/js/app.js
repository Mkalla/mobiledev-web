// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'ngCordova', 'angularMoment']);

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')

  /* Routing for our pages and tabs */
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

  $stateProvider.state('faq', {
    url: '/faq',
    templateUrl: 'templates/faq.html',
    controller: 'faqCtrl'   
  })

  $stateProvider.state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'   
  })

  $stateProvider.state('em-contacts', {
    url: '/em-contacts',
    templateUrl: 'templates/em-contacts.html',
    controller: 'emContCtrl'   
  })

  $stateProvider.state('em-react', {
    url: '/em-react',
    templateUrl: 'templates/em-react-home.html',
    controller: 'emergencyReacCtrl',
    views: {
      'em-react-tab-1': {
        'templateUrl': 'templates/em-tab-1.html',
        controller: 'emReactCtrl'
      },
      'em-react-tab-2': {
        'templateUrl': 'templates/em-tab-2.html',
        controller: 'emReactCtrl'        
      },
      'em-react-tab-3': {
        'templateUrl': 'templates/em-tab-3.html',
        controller: 'emReactCtrl'        
      },
      'em-react-tab-4': {
        'templateUrl': 'templates/em-tab-4.html',
        controller: 'emReactCtrl'        
      }
    }
  })

  $stateProvider.state('acc-report-submit', {
    url: '/report-submit',
    templateUrl: 'templates/acc-rep-submit.html',
    controller: 'accRepCtrl',
    views: {
      'acc-rep-step-1': {
        'templateUrl': 'templates/acc-rep-tab-1.html',
        controller: 'accRepCtrl'
      },
      'acc-rep-step-2': {
        'templateUrl': 'templates/acc-rep-tab-2.html',
        controller: 'accRepCtrl'        
      },
      'acc-rep-step-3': {
        'templateUrl': 'templates/acc-rep-tab-3.html',
        controller: 'accRepCtrl'        
      },
      'acc-rep-step-4': {
        'templateUrl': 'templates/acc-rep-tab-4.html',
        controller: 'accRepCtrl'        
      }
    }
  })

  $stateProvider.state('acc-reports-list', {
    url: '/acc-reps-list.html',
    templateUrl: 'templates/acc-reps-list.html',
    controller: 'emContCtrl'   
  })

  $stateProvider.state('acc-report-single', {
    url: '/acc-rep-single.html',
    templateUrl: 'templates/acc-rep.html',
    controller: 'emContCtrl'   
  })
})

app.run(function(amMoment) {
    amMoment.changeLocale('en');
});