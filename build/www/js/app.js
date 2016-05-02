// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'ngCordova', 'angularMoment', "ui.router"]);

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller:"menuCtrl"
    })

    /* Routing for our pages and tabs */
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })

    .state('app.faq', {
      url: '/faq',
      views: {
        'menuContent': {
          templateUrl: 'templates/faq.html',
          controller: 'faqCtrl'
        }
      }
    })

    .state('app.terms', {
      url: '/terms',
      views: {
        'menuContent': {
          templateUrl: 'templates/terms.html',
          controller: 'termsCtrl'
        }
      }
    })

    .state('app.register', {
      url: '/register',
      views: {
        'menuContent': {
          templateUrl: 'templates/register.html',
          controller: 'registerCtrl'
        }}
    })

    .state('app.em-contacts', {
      url: '/em-contacts',
      views: {
        'menuContent': {
          templateUrl: 'templates/em-contacts.html',
          controller: 'emContactsCtrl'
        }}
    })

    .state('app.em-react', {
      url: '/em-react',
      views: {
        'menuContent': {
          templateUrl: 'templates/em-react-home.html',
          controller: 'emReactCtrl'
        }}
    })

    .state('app.acc-rep-submit', {
      url: '/acc-rep-submit',
      views: {
        'menuContent': {
          templateUrl: 'templates/acc-rep-submit.html',
          controller: 'accRepCtrl'
        }}
    })

    .state('app.acc-reports-tab-1', {
      url: '/acc-reps-tab1',
      views: {
        'menuContent': {
          templateUrl: 'templates/acc-rep-tab-1.html',
          controller: 'CameraCtrl'
        }}
    })

    .state('app.acc-reports-tab-2', {
      url: '/acc-reps-tab2',
      views: {
        'menuContent': {
          templateUrl: 'templates/acc-rep-tab-2.html',
          controller: 'CameraCtrl'
        }}
    })

    .state('app.acc-reports-tab-3', {
      url: '/acc-reps-tab3',views: {
        'menuContent': {
          templateUrl: 'templates/acc-rep-tab-3.html',
          controller: 'CameraCtrl'
        }}
    })

    .state('app.acc-reports-tab-4', {
      url: '/acc-reps-tab4',
      views: {
        'menuContent': {
          templateUrl: 'templates/acc-rep-tab-4.html',
          controller: 'CameraCtrl'
        }
      }
    })

    .state('app.acc-reports-list', {
      url: '/acc-reps-list',
      views: {
        'menuContent': {
          templateUrl: 'templates/acc-reps-list.html',
          controller: 'accRepListCtrl'
        }
      }
    })

    .state('app.acc-report-single', {
      url: '/acc-rep-single',
      views: {
        'menuContent': {
          templateUrl: 'templates/acc-rep.html',
          controller: 'emRepSglCtrl'
        }
      }
    })

    .state('app.register-done', {
      url: '/register-done',
      views: {
        'menuContent': {
          templateUrl: 'templates/register-done.html',
        }
      }
    })

    .state('app.logon', {
      url: '/logon',
      views: {
        'menuContent': {
          templateUrl: 'templates/logon.html',
          controller: 'logonCtrl'
        }
      }
    })

    .state('app.members', {
      url: '/members',
      views: {
        'menuContent': {
          templateUrl: 'templates/members.html',
          controller: 'logonCtrl'
        }
      }
    })

    .state('app.em-tab-1', {
      url: '/em-tab1',
      views: {
        'menuContent': {
          templateUrl: 'templates/em-tab-1.html',
          controller: 'emReactCtrl'
        }
      }
    })

    .state('app.em-tab-2', {
      url: '/em-tab2',
      views: {
        'menuContent': {
          templateUrl: 'templates/em-tab-2.html',
          controller: 'emReactCtrl'
        }
      }
    })

    .state('app.em-tab-3', {
      url: '/em-tab3',
      views: {
        'menuContent': {
          templateUrl: 'templates/em-tab-3.html',
          controller: 'emReactCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/app/home');


});

app.run(function(amMoment) {
  amMoment.changeLocale('en');
});
