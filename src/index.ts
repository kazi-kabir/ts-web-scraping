import axios from 'axios';
import cheerio from 'cheerio';
import { cleanData, createArrayOfCompanyDataObjects } from './utils';

const url = 'https://en.wikipedia.org/wiki/List_of_unicorn_startup_companies'; 
const AxiosInstance = axios.create(); 

AxiosInstance.get(url)
  .then( 
    response => {
        const html = response.data; 
        const $ = cheerio.load(html); 
        const statsTable: cheerio.Cheerio = $('.wikitable tbody > tr');
        const topCompanies: string[] = [];

        statsTable.each((i, elem) => {
            let details: string = $(elem).find('td').text(); 
            details = details.split(' ').join('');
            topCompanies.push(details);
        });
        // somewhere here DEEP CLONE the data
        const deepCopy = JSON.parse(JSON.stringify(topCompanies)) as typeof topCompanies;
        const cleanedDeepCopy = cleanData(deepCopy);
        createArrayOfCompanyDataObjects(cleanedDeepCopy);
    }
)
.catch(console.error); 