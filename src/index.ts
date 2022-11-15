import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://en.wikipedia.org/wiki/List_of_unicorn_startup_companies'; 
const AxiosInstance = axios.create(); 

interface CompanyData {
    company: string,
    valuation: number,
    country: string
    founders: string,
}

const cleanData = (topCompanies: string[]): CompanyData[] => {
    // manipulating data directly, bad practice

    topCompanies.length = 10;
    
    let unacceptableStrings: string[] = ['CBInsights', 'VentureBeat', 'TechCrunch', 'Incmagazine'];

    let filterOutEmpty = topCompanies
    .filter(company => company.length > 1);
    
    let filterOutCBInsights = filterOutEmpty
    .filter(company => !company.includes('CBInsights'));

    let filterOutTechCrunch = filterOutCBInsights
    .filter(company => !company.includes('TechCrunch'));

    let filterOutIncMagazine = filterOutTechCrunch
    .filter(company => !company.includes('Incmagazine'));

    console.log(filterOutIncMagazine);
    return [];
}


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