import axios from 'axios';
import cheerio from 'cheerio';


// const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance

const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1'

interface CompanyData {
    company: string;
    industry: string;
    country: string;
}

AxiosInstance.get(url)
  .then( 
    response => {
        const html = response.data; 
        const $ = cheerio.load(html); 
        const statsTable: cheerio.Cheerio = $('.wikitable sortable jquery-tablesorter tbody tr'); 
        console.log(statsTable); 
        const topCompanies: CompanyData[] = [];

        // statsTable.each((i, elem) => {
        //     // $(elem).find('.playerName > strong').text();

        //     const company: string = $(elem).get(0).find('tr,td,a,title').text(); // Parse the rank
        //     const industry: string = $(elem).find('title').text(); // Parse the rank
        //     const country: string = $(elem).find('title').text(); // Parse the rank
        //     topCompanies.push({
        //       company,
        //       industry,
        //       country
        //     })
        // })
        // console.log(topCompanies) 
    }
  )
  .catch(console.error); 