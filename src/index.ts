import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://en.wikipedia.org/wiki/List_of_unicorn_startup_companies'; 
const AxiosInstance = axios.create(); 

interface CompanyData {
    details: string;
}

AxiosInstance.get(url)
  .then( 
    response => {
        const html = response.data; 
        const $ = cheerio.load(html); 
        const statsTable: cheerio.Cheerio = $('.wikitable tbody > tr');
        const topCompanies: CompanyData[] = [];
        let arr = [];

        statsTable.each((i, elem) => {
            let details: string = $(elem).find('td').text(); 
            details = details.split(' ').join('');
            arr[i] = details;
            arr.length = 10;
        })
        arr.forEach(n => console.log(n))
    }
  )
  .catch(console.error); 