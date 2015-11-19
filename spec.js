"use strict";
let server,
    request = require('supertest');

describe('Handling get requests', () => {
    beforeEach(() => {
        server = require('./server');
    });

    afterEach(() => {
        server.close();
    });

    it('Responds to /', function testSlash (done){
        request(server)
        .get('/')
        .expect(200, done);
    });

    it('Responds to /download', function testSlash (done){
        request(server)
            .get('/download')
            .expect(200, done);
    })
});