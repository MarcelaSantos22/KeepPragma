(function() {
    'use strict';

    angular.module('MyFirstApp', [
            'ui.router',
            'firebase',
            'ngStorage',
            'ngMaterial'
        ])
        .config(function($stateProvider, $urlRouterProvider) {

            $stateProvider.state('login', {
                templateUrl: 'templates/login.html',
                controller: 'loginController',
                controllerAs: 'vm',
                url: '/'
            });
             $stateProvider.state('register', {
                templateUrl: 'templates/register.html',
                controller: 'registerController',
                controllerAs: 'vm',
                url: '/register'
            });
            $stateProvider.state('home', {
                templateUrl: 'templates/home.html',
                controller: 'homeController',
                controllerAs: 'vm',
                url: '/home'
            });
            $stateProvider.state('home.createTask', {
                templateUrl: 'templates/createTask.html',
                controller: 'noteController',
                controllerAs: 'vm',
                url: '/createTask'
            });
            $stateProvider.state('home.editTask', {
                templateUrl: 'templates/editTask.html',
                controller: 'noteController',
                controllerAs: 'vm',
                url: '/editTask'
            });
            $stateProvider.state('home.allTask', {
                templateUrl: 'templates/allTask.html',
                controller: 'noteController',
                controllerAs: 'vm',
                url: '/allTask'
            });
            $stateProvider.state('home.completTask', {
                templateUrl: 'templates/completTask.html',
                controller: 'noteController',
                controllerAs: 'vm',
                url: '/completTask'
            });
            $stateProvider.state('home.pendingTask', {
                templateUrl: 'templates/pendingTask.html',
                controller: 'noteController',
                controllerAs: 'vm',
                url: '/pendingTask'
            });

            $urlRouterProvider.otherwise('/');

        });

})();