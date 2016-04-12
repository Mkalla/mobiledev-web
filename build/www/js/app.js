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

  $stateProvider.state('terms', {
    url: '/terms',
    templateUrl: 'templates/terms.html',
    controller: 'termsCtrl'   
  })

  $stateProvider.state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'   
  })

  $stateProvider.state('em-contacts', {
    url: '/em-contacts',
    templateUrl: 'templates/em-contacts.html',
    controller: 'emContactsCtrl'   
  })

  $stateProvider.state('em-react', {
    url: '/em-react',
    templateUrl: 'templates/em-react-home.html',
    controller: 'emReactCtrl'
  })

  $stateProvider.state('acc-rep-submit', {
    url: '/acc-rep-submit',
    templateUrl: 'templates/acc-rep-submit.html',
    controller: 'accRepCtrl'
  })

  $stateProvider.state('acc-reports-list', {
    url: '/acc-reps-list',
    templateUrl: 'templates/acc-reps-list.html',
    controller: 'accRepListCtrl'   
  })

  $stateProvider.state('acc-report-single', {
    url: '/acc-rep-single',
    templateUrl: 'templates/acc-rep.html',
    controller: 'emRepSglCtrl'   
  })
})

app.run(function(amMoment) {
    amMoment.changeLocale('en');
});