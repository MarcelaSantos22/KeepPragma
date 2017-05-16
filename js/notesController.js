(function () {
    'use strict';

    angular
        .module('MyFirstApp')
        .controller('noteController', noteController);

    noteController.inject = ['$state', '$firebaseArray', '$firebaseAuth', '$localStorage'];

    function noteController($state, $firebaseArray, $firebaseAuth, $localStorage) {

        var vm = this;
        var refNotas = firebase.database().ref().child('Notas');
        vm.tasks = $firebaseArray(refNotas);
        vm.addTask = addTask;
        vm.limit = 10;
        vm.increaseTaskNumber = increaseTaskNumber;
        vm.$storage = $localStorage;
        vm.goEdit = goEdit;
        vm.updateTask = updateTask;
        vm.changeState = changeState;

        const user = firebase.auth().currentUser;

        function addTask(newTask) {
            newTask.state = 'Pendiente';
            newTask.date = new Date(newTask.date);

            vm.tasks.$add({
                title: newTask.title,
                description: newTask.description,
                state: newTask.state,
                date: newTask.date
            });

            $state.go('home.allTask');
        };

        // Ingrementa el contador en 6 para ir mostrando los siguientes comics en la lista
        function increaseTaskNumber() {
            vm.limit += 6;
        }

        function goEdit(id) {
            var ref = firebase.database().ref().child('Notas/' + id);
            vm.tasks = $firebaseArray(ref);
            vm.$storage.id = id;
            $state.go('home.editTask');
        }

        function updateTask() {
            var id = vm.$storage.id;
            vm.editPostData.state = 'Pendiente';
            vm.editPostData.date = new Date(vm.editPostData.date);
            console.log("date: " + vm.editPostData.date);


            var ref = firebase.database().ref().child('Notas/' + id);
            ref.update({
                title: vm.editPostData.title,
                description: vm.editPostData.description,
                state: vm.editPostData.state,
                date: vm.editPostData.date
            }).then(function (ref) {
                $state.go('home.allTask');
            }, function (error) {
                console.log(error);
            })
        }

        function changeState(id) {
            console.log("tasks: " + id);
            var mState = 'Realizada';

            var ref = firebase.database().ref().child('Notas/' + id);
            ref.update({
                state: mState
            }).then(function (ref) {
                // $state.go('home.allTask');
                alert("Tarea Realizada!!")
            }, function (error) {
                console.log(error);
            })
        }

        function cancelTask() {
            $state.go('home.allTask');
        }
    }
})();