import readline from 'readline';
import fs from 'fs';

const rl=readline.createInterface({
    input : process.stdin,
    output : process.stdout
})

const fileCreation=()=>{
rl.question("Enter the filename : ", (filename)=>{
    rl.question("Enter the file extension ", (extension)=>{
        rl.question("Enter the file content ",(content)=>{
            fs.writeFile(`${filename}.${extension}`, content , (err)=>{
                if(err){
                    console.error(`invalid file ${err.message}`);
                }else{
                    console.log(`${filename} file is created successfully`);
                }
            })
        })
    })
})
}

fileCreation();