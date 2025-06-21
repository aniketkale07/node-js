import readline from 'readline';
import https from 'https';
import chalk from 'chalk';

const api='8fdb225c42d94e0db2325521251506';
const url = 'https://api.weatherapi.com/v1/current.json?key=' + api + '&q=';


const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
})



console.log(chalk.blue.bold('\n🌦️  Weather CLI App\n'));

const getWeather=async (city) =>{
const url=
}


const city = await rl.question("enter the question : ");
await getWeather(city);
rl.close();

