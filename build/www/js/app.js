// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic']);

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
})

app.factory('pageService', function() {

});