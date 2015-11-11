(function () {
    "use strict";

    angular.module('scraper')
        .controller("ScraperController", ScraperController);

    console.log('scraper works...');
    function ScraperController(){
        let vm = this;

        vm.message = "ScraperControllerWorks";

        vm.urlCount = 0;

        vm.range = function(){
            return new Array(vm.urlCount);
        }

    }
}());