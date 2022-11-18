const express = require('express');
const app = express();
const port = 3050;
const bodyParser = require('body-parser');
const cors = require('cors');

import companyDataStore from ".";


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.get('/companyData', (req, res) => {
    res.json('foo');
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
