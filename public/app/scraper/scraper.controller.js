(function () {
    "use strict";

    angular.module('scraper')
        .controller("ScraperController", ['ScraperService', 'FileSaver', 'Blob', "$mdToast", ScraperController]);

    function ScraperController(ScraperService, FileSaver, Blob, $mdToast){

        let vm = this;

        //Temporary helper variables
        vm.urlCount = 0;
        vm.list = [];

        //A helper function for iterating urls
        vm.range = function(){
            return new Array(vm.urlCount);
        };

        vm.isProcessing = false;
        vm.isReady = false;
        vm.isDone = false;


        //The function executes once the urlsForm is submitted
        vm.process = function () {
            vm.isProcessing = true;

            ScraperService.sendData(vm.list)
                .success((response) => {
                    vm.isProcessing = false;
                    vm.isReady = true;

                    //Toastr notification
                    $mdToast.show(
                        $mdToast.simple()
                            .content(response.message)
                            .action('OK')
                            .highlightAction(false)
                            .position('right')
                    );
                });
        };

        vm.download = function(){
            ScraperService.receiveData()
                .success((data) => {
                    vm.isDone = true;
                    vm.isReady = false;
                    vm.isProcessing = false;
                    var dataToSave = new Blob([data], { type: 'text/plain;charset=utf-8' });
                    FileSaver.saveAs(dataToSave, 'data.txt');
                })
        }
    }
}());