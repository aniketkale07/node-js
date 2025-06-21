import readline from 'readline';
import https from 'https';
import chalk from 'chalk';

const API_KEY = '8fdb225c42d94e0db2325521251506'; // Note: This appears to be an invalid API key
const BASE_URL = 'https://api.weatherapi.com/v1/current.json?key=' + API_KEY + '&q=';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(chalk.blue.bold('\n🌦️  Weather CLI App\n'));
console.log(chalk.yellow('Enter a city name to get current weather (or type "exit" to quit)\n'));

function getWeather() {
    rl.question(chalk.cyan('Enter city name: '), (city) => {
        if (city.toLowerCase() === 'exit') {
            console.log(chalk.yellow('\nThank you for using Weather CLI!'));
            rl.close();
            return;
        }

        console.log(chalk.gray('\nFetching weather data...'));

        https.get(BASE_URL + encodeURIComponent(city), (response) => {
            let data = '';
            
            // Check for bad status code
            if (response.statusCode !== 200) {
                console.log(chalk.red(`\nAPI Error: HTTP ${response.statusCode}`));
                getWeather(); // Ask for new input
                return;
            }

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const weatherData = JSON.parse(data);
                    
                    if (weatherData.error) {
                        console.log(chalk.red(`\nError: ${weatherData.error.message}`));
                    } else {
                        displayWeather(weatherData);
                    }
                } catch (error) {
                    console.log(chalk.red('\nFailed to parse weather data'));
                }
                getWeather(); // Ask for new input
            });

        }).on('error', (err) => {
            console.error(chalk.red('\nNetwork Error:', err.message));
            getWeather(); // Ask for new input
        });
    });
}

function displayWeather(weatherData) {
    const { name, region, country } = weatherData.location;
    const { temp_c, temp_f, condition, humidity, wind_kph, wind_dir } = weatherData.current;
    
    console.log(chalk.green.bold(`\n📍 Weather in ${name}, ${region}, ${country}:`));
    console.log(chalk.hex('#FFA500')(`🌡️  Temperature: ${temp_c}°C (${temp_f}°F)`));
    console.log(chalk.cyan(`🌈 Condition: ${condition.text}`));
    console.log(chalk.blue(`💧 Humidity: ${humidity}%`));
    console.log(chalk.magenta(`🍃 Wind: ${wind_kph} kph ${wind_dir}`));
    console.log(chalk.gray('────────────────────────'));
}

// Start the application
getWeather();