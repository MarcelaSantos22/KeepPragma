(function () {
    'use strict';

    angular
        .module('MyFirstApp')
        .controller('loginController', loginController);

    loginController.inject = ['$state', '$firebaseAuth', '$localStorage'];

    function loginController($state, $firebaseAuth, $localStorage) {
        var vm = this;
        vm.signIn = signIn;
        vm.goRegister = goRegister;
        vm.$storage = $localStorage;



        function signIn() {
            var username = vm.user.email;
            var pws = vm.user.pws;

            var auth = $firebaseAuth();

            auth.$signInWithEmailAndPassword(username, pws)
                .then(function () {
                    var user = firebase.auth().currentUser;

                    vm.errMsg = false;
                    var credential = firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        user.providerId
                    );
                    console.log("  Provider-specific UID: " + JSON.stringify(credential));
                    vm.$storage = credential;
                    
                    $state.go('home');
                }).catch(function (error) {
                    vm.errMsg = true;
                    console.log("error: " + error.message);
                    vm.errorMessage = error.message;
                });

        }

        function goRegister() {
            $state.go('register');
        }
    }
})();