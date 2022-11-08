import axios from 'axios';
import cheerio from 'cheerio';



const url = 'https://en.wikipedia.org/wiki/List_of_unicorn_startup_companies'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance


interface CompanyData {
    company: string;
}

AxiosInstance.get(url)
  .then( 
    response => {
        const html = response.data; 
        const $ = cheerio.load(html); 
        const statsTable: cheerio.Cheerio = $('.wikitable tbody > tr');
        const topCompanies: CompanyData[] = [];

        statsTable.each((i, elem) => {
            const company: string = $(elem).find('td > a ').text();
            topCompanies.push(
                {
                    company
                }
            )
        })

        console.log(topCompanies)
    }
  )
  .catch(console.error); 