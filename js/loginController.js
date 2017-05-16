(function () {
    'use strict';

    angular
        .module('MyFirstApp')
        .controller('loginController', loginController)
        .service('CommonProp', CommonProp);

    loginController.inject = ['$state', '$firebaseAuth', '$localStorage', '$location', 'CommonProp'];
    CommonProp.inject = ['$location', '$localStorage', '$firebaseAuth'];

    function loginController($state, $firebaseAuth, $localStorage, $location, CommonProp) {
        var vm = this;
        vm.signIn = signIn;
        vm.goRegister = goRegister;
        vm.$storage = $localStorage;

        vm.username = CommonProp.getUser();


        function signIn() {
            var username = vm.user.email;
            var pws = vm.user.pws;

            var auth = $firebaseAuth();

            auth.$signInWithEmailAndPassword(username, pws)
                .then(function () {
                    // var user = firebase.auth().currentUser;

                    // vm.errMsg = false;
                    // var credential = firebase.auth.EmailAuthProvider.credential(
                    //     user.email,
                    //     user.providerId
                    // );
                    // console.log("  Provider-specific UID: " + JSON.stringify(credential));
                    // vm.$storage = credential;
                    CommonProp.setUser(vm.user.email);
                    $location.path('/home');

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


    function CommonProp($location, $localStorage, $firebaseAuth) {
        var user = "";
        var vm = this;
        vm.$storage = $localStorage;
        var auth = $firebaseAuth();

        return {
            getUser: function () {
                if (user == "") {
                    user = vm.$storage.userEmail;
                    // user = $localStorage.getItem("userEmail");
                }
                return user;
            },
            setUser: function (value) {
                vm.$storage.userEmail = value;
                // $localStorage.setItem("userEmail", value);
                user = value;
            },
            logoutUser: function () {
                auth.$signOut();
                console.log("Legged out Succesfully");
                user = "";
                delete vm.$storage.userEmail;
                $location.path('/');               
            }
        }
    }

})()