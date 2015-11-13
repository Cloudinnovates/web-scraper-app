(function () {
    "use strict";

    angular.module('scraper')
        .controller("ScraperController", ScraperController);

    function ScraperController(ScraperService){

        let vm = this;

        //Temporary helper variables
        vm.urlCount = 0;
        vm.list = [];

        //A helper function for iterating urls
        vm.range = function(){
            return new Array(vm.urlCount);
        };

        vm.message = 'Not finished!';

        //The function executes once the urlsForm is submitted
        vm.startScraping = function () {
            vm.processing = true;

            ScraperService.sendData(vm.list)
                .success((message) => {
                    vm.message = message;
                });
        }

    }
}());