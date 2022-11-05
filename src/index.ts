import axios from 'axios';
import cheerio from 'cheerio';


const url = 'https://www.premierleague.com/stats/top/players/goals?se=-1&cl=-1&iso=-1&po=-1?se=-1'; // URL we're scraping
const AxiosInstance = axios.create(); // Create a new Axios Instance

interface PlayerData {
    rank: number; // 1 - 20 rank
    name: string;
    nationality: string;
    goals: number;
  }

AxiosInstance.get(url)
  .then( 
    response => {
        const html = response.data; 
        const $ = cheerio.load(html); 
        const statsTable: cheerio.Cheerio = $('.statsTableContainer > tr'); 
        console.log(statsTable); 
        const topScorers: PlayerData[] = [];

        statsTable.each((i, elem) => {
            const rank: number = parseInt($(elem).find('.rank > strong').text()); // Parse the rank
            const name: string = $(elem).find('.playerName > strong').text(); // Parse the name
            const nationality: string = $(elem).find('.playerCountry').text(); // Parse the country
            const goals: number = parseInt($(elem).find('.mainStat').text()); // Parse the number of goals
            topScorers.push({
              rank,
              name,
              nationality,
              goals
            })
        })
        console.log(topScorers);
    }
  )
  .catch(console.error); 