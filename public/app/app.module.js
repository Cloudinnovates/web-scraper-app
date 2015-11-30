(function () {
    "use strict";

    angular.module('main', [
        "scraper",
        "ngMaterial",
        "ui.router",
        "ngFileSaver"
    ])

    //Routes configurations
    .config(function($stateProvider, $urlRouterProvider) {

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
        })
}());