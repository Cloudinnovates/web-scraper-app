//Here we place all needed configuration properties
module.exports = {
    port: 3000,
    //Scraping options
    options:  {
        title: 'title',
        content : ['.entry-content p, .entry p, #content p, .art-postcontent p']
    },
    filename: 'app/data/data.txt'
};