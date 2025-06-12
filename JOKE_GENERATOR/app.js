import https from 'https';
import chalk from 'chalk';

const getJoke = () => {
    const url = 'https://official-joke-api.appspot.com/random_joke';
    
    https.get(url, (response) => {
        let data = "";
        
        // Collect data chunks
        response.on('data', (chunk) => {
            data += chunk;
        });

        // When all data is received
        response.on('end', () => {
            try {
                const joke = JSON.parse(data);
                console.log(chalk.yellow.bold("\nHERE'S YOUR RANDOM JOKE:"));
                console.log(chalk.red(joke.setup));
                console.log(chalk.blue.bgRed.bold(joke.punchline));
                console.log(chalk.green(`\nJoke Type: ${joke.type}`));
            } catch (parseError) {
                console.error(chalk.red("Error parsing joke data:", parseError.message));
            }
        });
    }).on('error', (err) => {
        console.error(chalk.red("Error fetching joke:", err.message));
    });
};

getJoke();