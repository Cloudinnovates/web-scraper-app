(function () {
    "use strict";

    angular.module('scraper')
        .controller("ScraperController", ['ScraperService', 'FileSaver', 'Blob', ScraperController]);

    function ScraperController(ScraperService, FileSaver, Blob){

        let vm = this;

        //Temporary helper variables
        vm.urlCount = 0;
        vm.list = [];

        //A helper function for iterating urls
        vm.range = function(){
            return new Array(vm.urlCount);
        };

        vm.processingStatus = 'Not finished!';
        vm.downloadingStatus = 'Not finished!';
        vm.isProcessing = false;
        vm.isReady = false;

        //The function executes once the urlsForm is submitted
        vm.process = function () {
            vm.isProcessing = true;

            ScraperService.sendData(vm.list)
                .success((message) => {
                    vm.processingStatus = message;
                    vm.isProcessing = false;
                    vm.isReady = true;
                });
        };

        vm.download = function(){
            ScraperService.receiveData()
                .success((data) => {
                    vm.downloadingStatus = "Done!";

                    var dataToSave = new Blob([data], { type: 'text/plain;charset=utf-8' });
                    FileSaver.saveAs(dataToSave, 'data.txt');
                })
        }
    }
}());