//SCRAPER CONTROLLER
class ScraperController{
    constructor(ScraperService, FileSaver, Blob, $mdToast){
        //Dependencies
        this.ScraperService = ScraperService;
        this.FileSaver = FileSaver;
        this.Blob = Blob;
        this.$mdToast = $mdToast;

        //Working with URLs
        this.urlCount = 0; //number of URLs
        this.list = [];    //URLs themselves

        //State indicators
        this.isProcessing = false;
        this.isReady = false;
        this.isDone = false;
    }

    //A helper function for iterating urls
    range(){
        return new Array(this.urlCount);
    }

    //The function executes once the urlsForm is submitted
    process(){
        this.isProcessing = true;

        ScraperService.sendData(vm.list)
            .success((response) => {
                this.isProcessing = false;
                this.isReady = true;

                //Toastr notification
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .content(response.message)
                        .action('OK')
                        .highlightAction(false)
                        .position('bottom right')
                );
            });
    }

    //The function executes once the scraping processed is finished
    download(){
        ScraperService.receiveData()
            .success((data) => {
                this.isDone = true;
                this.isReady = false;
                let dataToSave = new this.Blob([data], { type: 'text/plain;charset=utf-8' });
                this.FileSaver.saveAs(dataToSave, 'data.txt');
            })
    }
}

export {ScraperController}