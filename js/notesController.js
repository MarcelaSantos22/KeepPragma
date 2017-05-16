(function () {
    'use strict';

    angular
        .module('MyFirstApp')
        .controller('noteController', noteController);

    noteController.inject = ['$state', '$firebaseArray', '$firebaseAuth', '$localStorage'];

    function noteController($state, $firebaseArray, $firebaseAuth, $localStorage) {

        var refNotas = firebase.database().ref().child('Notas');

        var vm = this;

        vm.tasks = $firebaseArray(refNotas);
        vm.isOpen = false;
        vm.addTask = addTask;
        vm.limit = 10;
        vm.increaseTaskNumber = increaseTaskNumber;
        vm.$storage = $localStorage;
        vm.goEdit = goEdit;
        // vm.filterTasks = filterTasks;
        // vm.pendingTask
        // vm.showTasks = showTasks;

        const user = firebase.auth().currentUser;
        // var credential = vm.$storage;
        console.log(vm.tasks)

        // var credentials = firebase.auth.EmailAuthProvider.credential(credential);
        // user.reauthenticate(credential);
        // var credential = firebase.auth.EmailAuthProvider.credential(
        //     user.email,
        //     user.providerId
        // );
        // user.reauthenticate(credential).then(function () {
        //     console.log("bien");
        // }, function (error) {
        //     console.log("mal " + error);
        // });

        function addTask(newTask) {
            newTask.state = 'Realizada';

            var d = new Date(newTask.date);
            var datestring = ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + +d.getFullYear();
            newTask.date = datestring;

            vm.tasks.$add({
                title: newTask.title,
                description: newTask.description,
                state: newTask.state,
                date: newTask.date.toString()
            });

            $state.go('home.allTask');
        };



        // Ingrementa el contador en 6 para ir mostrando los siguientes comics en la lista
        function increaseTaskNumber() {
            vm.limit += 6;
        }

        function goEdit(){
            $state.go('home.editTask');
        }

    }
})();