//SCRAPER SERVICE
class ScraperService{
    constructor($http){
        this.$http = $http;
    }

    //Function for sending data
    sendData(data){
        return this.$http.post('/process', data);
    }

    //Function for receiving data
    receiveData(){
        return this.$http.get('/download');
    }
}

export {ScraperService}

