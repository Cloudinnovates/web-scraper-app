(function () {
    "use strict";

    angular.module('scraper')
        .controller("ScraperController", ScraperController);

    function ScraperController(){

        let vm = this;

        //Temporary helper variables
        vm.urlCount = 0;
        vm.list = [];

        //A helper function for iterating urls
        vm.range = function(){
            return new Array(vm.urlCount);
        };

        //All valid urls will be stored in this object
        vm.urls = {};

        //Convert urls from the temp list to the object
        vm.convert = function () {
            vm.list.forEach(function (url, index) {
               vm.urls['url' + (index + 1)] = url;
            });
        };

        //The function executes once the urlsForm is submitted
        vm.start = function () {
            vm.convert();
            console.log(vm.urls + vm.urlCount);
        }

    }
}());