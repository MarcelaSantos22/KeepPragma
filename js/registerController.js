(function () {
    'use strict';

    angular
        .module('MyFirstApp')
        .controller('registerController', registerController);

    registerController.inject = ['$state', '$firebaseAuth'];

    function registerController($state, $firebaseAuth) {
        var vm = this;
        vm.register = register;
        vm.goLogin = goLogin;

        function register() {
            var username = vm.user.email;
            var pws = vm.user.pws;

            if (username && pws) {
                var auth = $firebaseAuth();

                auth.$createUserWithEmailAndPassword(username, pws)
                    .then(function () {
                        console.log("User Created");
                        vm.errMsg = false;
                        $state.go('login');
                    }).catch(function (error) {
                        vm.errMsg = true;
                        console.log("error: " + error.message);
                        vm.errorMessage = error.message;
                    });
            }
            
        };

        function goLogin() {
            $state.go('login');
        }
    }
})();