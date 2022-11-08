import axios from 'axios';
import cheerio from 'cheerio';



const url = 'https://en.wikipedia.org/wiki/List_of_unicorn_startup_companies'; 
const AxiosInstance = axios.create(); 


interface CompanyData {
    company: string;
    country: string;
}

AxiosInstance.get(url)
  .then( 
    response => {
        const html = response.data; 
        const $ = cheerio.load(html); 
        const statsTable: cheerio.Cheerio = $('.wikitable tbody > tr');
        const topCompanies: CompanyData[] = [];

        statsTable.each((i, elem) => {
            let company: string = $(elem).find('td > a').attr('title');
            if(company === '' || company === undefined) return;
            
            let country: string = $(elem).find('td').text(); 

            topCompanies.push(
                {
                    company,
                    country
                }
            )
        })

        topCompanies.length = 10;  
        console.log(topCompanies);
    }
  )
  .catch(console.error); 