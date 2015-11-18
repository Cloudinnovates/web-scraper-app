(function () {
    "use strict";

    angular
        .module('main')
        .controller("MainController", [MainController]);

    function MainController(){
        let vm = this;

        vm.message = "MainControllerWorks";
    }
}());