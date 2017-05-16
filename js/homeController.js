(function () {
    'use strict';


    angular
        .module('MyFirstApp')
        .controller('homeController', homeController);

    homeController.inject = ['$state', '$localStorage', 'CommonProp'];

    function homeController($state, $localStorage, CommonProp) {
        var vm = this;
        vm.$storage = $localStorage;
        vm.logout = logout;
        vm.saveSearch = saveSearch;

        vm.user = vm.$storage.userEmail;
       
        function saveSearch (){
            vm.$storage.search = vm.searchText;
        console.log("search: "+ vm.$storage.search);
    }

        function logout() {
            CommonProp.logoutUser();
        }

    }
})();