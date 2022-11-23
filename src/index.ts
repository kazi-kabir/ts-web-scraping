import axios from 'axios';
import { CompanyData } from './types';
import { cleanData, createArrayOfCompanyDataObjects } from './utils';
import cheerio, { Cheerio, load } from 'cheerio';

const url = 'https://en.wikipedia.org/wiki/List_of_unicorn_startup_companies'; 
const AxiosInstance = axios.create(); 
const express = require('express');
const app = express();
const port = 3050;

let companyDataStore: CompanyData[];

AxiosInstance.get(url)
  .then( 
    response => {
        const html = response.data; 
        const $ = load(html); 
        const statsTable: Cheerio<any> = $('.wikitable tbody > tr');
        const topCompanies: string[] = [];

        statsTable.each((i, elem) => {
            let details: string = $(elem).find('td').text(); 
            details = details.split(' ').join('');
            topCompanies.push(details);
        });
        // somewhere here DEEP CLONE the data
        const deepCopy = JSON.parse(JSON.stringify(topCompanies)) as typeof topCompanies;
        const cleanedDeepCopy = cleanData(deepCopy);
        companyDataStore = createArrayOfCompanyDataObjects(cleanedDeepCopy);
    }
)
.catch(console.error); 

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.get('/companyData', (req, res) => {
    res.json(JSON.parse(JSON.stringify(companyDataStore)));
})

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))