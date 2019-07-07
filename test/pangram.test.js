const supertest = require('supertest');
const { describe } = require('mocha');

//
const server = supertest.agent('http://localhost:3000');

describe('Test pangram route', () => {
  it('valid phrase (pangram) should return true', (done) => {
    const phrase = 'aAAAAADbbcdefghijklmqnopXrstuvwxyz123456!@#$%^&*()abcdefg';

    server
      .post('/rest/pangram')
      .send({ phrase })
      .expect('Content-type', /json/)
      .expect(200)
      .end((request, response) => {
        response.body.phrase.should.equal(phrase);
        response.body.isPangram.should.equal(true);
        done();
      });
  });

  it('valid phrase (not pangram) should return false', (done) => {
    const phrase = 'aAAAAADlmqnopXrstuvwxyz123456!@#$%^&*()';

    server
      .post('/rest/pangram')
      .send({ phrase })
      .expect('Content-type', /json/)
      .expect(200)
      .end((request, response) => {
        response.body.phrase.should.equal(phrase);
        response.body.isPangram.should.equal(false);
        done();
      });
  });

  it('empty phrase should return error message', (done) => {
    const phrase = '';

    server
      .post('/rest/pangram')
      .send({ phrase })
      .expect('Content-type', /json/)
      .expect(400)
      .end((request, response) => {
        response.body.errorMessage.should.equal('Error: string is empty. Please provide a valid string and try again.');
        done();
      });
  });

  it('phrase excluded from request should return error message', (done) => {
    server
      .post('/rest/pangram')
      .expect('Content-type', /json/)
      .expect(400)
      .end((request, response) => {
        response.body.errorMessage.should.equal('Error: phrase is required.');
        done();
      });
  });
});
