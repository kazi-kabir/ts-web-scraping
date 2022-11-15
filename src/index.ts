import axios from 'axios';
import cheerio from 'cheerio';
import { cleanData } from './utils';

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
        cleanData(topCompanies);
    }
)
.catch(console.error); 