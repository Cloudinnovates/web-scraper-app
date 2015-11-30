//SCRAPER MODULE
import {ScraperController}  from './controllers/scraper.controller'
import {ScraperService}  from './services/scraper.service'

angular
    .module('scraper', [])
    .controller('ScraperController',['ScraperService', 'FileSaver', 'Blob', "$mdToast", ScraperController])
    .factory('ScraperService', ScraperService);




