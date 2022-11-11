import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://en.wikipedia.org/wiki/List_of_unicorn_startup_companies'; 
const AxiosInstance = axios.create(); 

interface CompanyData {
    details: string;
}

const cleanData = (topCompanies: CompanyData[]): CompanyData[] => {
    // manipulating data directly, bad practice
    topCompanies.length = 50;

    // clear out the empty ones
    // store into new array
    topCompanies
    .filter(company => company.details !== '');
    
    // printing 
    topCompanies
    .forEach(company => console.log(company));

    return [];
}


AxiosInstance.get(url)
  .then( 
    response => {
        const html = response.data; 
        const $ = cheerio.load(html); 
        const statsTable: cheerio.Cheerio = $('.wikitable tbody > tr');
        const topCompanies: CompanyData[] = [];

        statsTable.each((i, elem) => {
            let details: string = $(elem).find('td').text(); 
            details = details.split(' ').join('');
            topCompanies.push({details});
            cleanData(topCompanies);
        })
    }
)
.catch(console.error); 