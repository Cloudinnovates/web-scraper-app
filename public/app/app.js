(function () {
    "use strict";

    angular.module('main', [
        "scraper",
        "ngMaterial",
        "ui.router",
        "ngFileSaver"
    ])

    //Routes configurations
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

            //For any unmatched url redirect to the home page
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/views/home.view.html',
                    controller: "MainController as main"
                })
                .state('scraper', {
                    url: "/scraper",
                    templateUrl: 'app/views/scraper.view.html',
                    controller: "ScraperController as scraper"
                })
        }])
}());
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
(function () {

    angular.module('scraper', []);

}());
(function () {
    "use strict";

    angular
        .module('scraper')
        .controller("ScraperController", ['ScraperService', 'FileSaver', 'Blob', "$mdToast", ScraperController]);

    function ScraperController(ScraperService, FileSaver, Blob, $mdToast){

        let vm = this;

        //Working with URLs
        vm.urlCount = 0; //number of URLs
        vm.list = [];    //URLs themselves

        //A helper function for iterating urls
        vm.range = function(){
            return new Array(vm.urlCount);
        };

        //State indicators
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
                            .position('bottom right')
                    );
                });
        };

        //The function executes once the scraping processed is finished
        vm.download = function(){
            ScraperService.receiveData()
                .success((data) => {
                    vm.isDone = true;
                    vm.isReady = false;
                    var dataToSave = new Blob([data], { type: 'text/plain;charset=utf-8' });
                    FileSaver.saveAs(dataToSave, 'data.txt');
                })
        }
    }
}());
(function () {
    "use strict";

    //Angular service for communicating with back end
    angular
        .module('scraper')
        .factory('ScraperService', ($http) => {

                //Function for sending data
                function sendData(data){
                    return $http.post('/process', data);
                }

                //Function for receiving data
                function receiveData(){
                    return $http.get('/download');
                }

                //Return an object with references to those methods
                return {
                    sendData: sendData,
                    receiveData: receiveData
                }
            })
}());

