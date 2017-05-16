(function () {
    'use strict';


    angular
        .module('MyFirstApp')
        .controller('homeController', homeController);

    homeController.inject = ['$state'];

    function homeController($state) {
        var vm = this;
        
    }
})();