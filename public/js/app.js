'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'ui.router',
  'ui.bootstrap'
]).
config(['$provide', '$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function ($provide, $stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {

    $urlRouterProvider.otherwise( function($injector, $location) {
        var $state = $injector.get("$state");
        $state.go("home");
    });

    $stateProvider
    .state('home', {
        url: "/home",
        controller: 'HomeCtrl',
        templateUrl: "partials/home"
    });

    $locationProvider.html5Mode(true);
}]);
