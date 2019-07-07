const supertest = require("supertest");
const should = require("should");

//
const server = supertest.agent("http://localhost:3000");

describe("Test pangram route", () => {


    it("valid pangram should return true", (done) => {

        const phrase = "aAAAAADbbcdefghijklmqnopXrstuvwxyz123456!@#$%^&*()abcdefg";

        server
            .post('/rest/pangram')
            .send({ phrase : phrase })
            .expect("Content-type",/json/)
            .expect(200)
            .end((request, response) => {
                response.body.phrase.should.equal(phrase);
                response.body.isPangram.should.equal(true);
                done();
            });
    });

    it("valid non-pangram should return false", (done) => {

        const phrase = "aAAAAADlmqnopXrstuvwxyz123456!@#$%^&*()";

        server
            .post('/rest/pangram')
            .send({ phrase : phrase })
            .expect("Content-type",/json/)
            .expect(200)
            .end((request, response) => {
                response.body.phrase.should.equal(phrase);
                response.body.isPangram.should.equal(false);
                done();
            });
    });

    it("invalid entry should return error message", (done) => {

        const phrase = "";

        server
            .post('/rest/pangram')
            .send({ phrase : phrase })
            .expect("Content-type",/json/)
            .expect(400)
            .end((request, response) => {
                response.body.errorMessage.should.equal("Error: phrase is required.");
                done();
            });
    });

});