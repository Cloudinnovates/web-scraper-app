(function () {
    "use strict";

    angular.module('main')
        .controller("MainController", [MainController]);

    console.log('main works');

    function MainController(){
        let vm = this;

        vm.message = "MainControllerWorks";
    }
}());