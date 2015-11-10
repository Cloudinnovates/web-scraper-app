(function () {
    "use strict";

    let app = angular.module('main', [
        "scraper",
        "ngMaterial",
        "ui.router"
    ]);


    //Routes configurations
    app
        .config(function($stateProvider, $urlRouterProvider) {

            //For any unmatched url redirect to the home page
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'app/views/home.view.html',
                    controller: "MainController as main"
                })
                .state('scrap', {
                    url: "/scrap",
                    templateUrl: 'app/views/scraper.view.html',
                    controller: "ScraperController as scraper"
                })
        })
}());