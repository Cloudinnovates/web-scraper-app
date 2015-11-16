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

