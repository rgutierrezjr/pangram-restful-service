const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const pangram = require('./services/pangram');

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());

app.post('/rest/pangram', (request, response) => {
    const body = _.pick(request.body, ['phrase']);

    if (!body.phrase) {
        return response.status(400).send({"errorMessage": "Error: phrase is required."});
    }

    pangram.isPangram(body.phrase, (result, errorMessage) => {

        let responsePayload = {
            "phrase": body.phrase,
            "isPangram": result,
            "errorMessage": ""
        }

        if (errorMessage) {
            responsePayload.errorMessage = errorMessage
            return response.status(400).send(responsePayload);
        }

        return response.status(200).send(responsePayload);
    });

});

app.listen(port, () => {
    console.log(`Started up at port ${port}.`);
});