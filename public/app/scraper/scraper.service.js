(function () {
    "use strict";

    angular
        .module('scraper')
        .factory('ScraperService', ($http) => {

                function sendData(data){
                    return $http.post('/run', data);
                }

                function receiveData(){
                    return $http.get('/run');
                }

                return {
                    sendData: sendData,
                    receiveData: receiveData
                }
            })
}());

