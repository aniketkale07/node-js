import chalk from 'chalk';
import https from 'https';
import readline from 'readline';


console.log(chalk.blue("Welcome to Currency Converter"));

const rl= readline.createInterface({
    input : process.stdin,
    output  : process.stdout
});


https.get(url, (response)=>{
    const data="";
    response.on('data', (chunk)=>{
        data +=chunk;
    })

    response.on(end, ()=>{
        const rates = JSON.parse(data).conversion_rates;

const amount=90;
const currency=inr;

        rl.question(`enter the amount to convert : `, (amount)=>{
            rl.question("Enter the currency to convert eg(INR, USD , NPR)", (currency)=>{
                const rate = rates[currency.toUpperCase()];
                const convertCurrency = amount * rate;
                if(!rate){
                    console.log(chalk.red(`Currency ${currency} not found`));
                    return;
                }
                else{
                    console.log(`${amount} USD is converting as ${currency} is : ${convertCurrency}`)
                }
            })
        })
     }).on('error', (err)=>{    
            console.error(chalk.red("Error for fetching data: ", err.message));
     })
})


