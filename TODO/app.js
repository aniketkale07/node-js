import readline from 'readline';

// Create interface for user interaction
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const todos = [];

const showMenu = () => {
    console.log("\n1. Add The Tasks");
    console.log("2. View The Tasks");
    console.log("3. Exit\n");

    rl.question("Choose an option: ", (input) => {
        // Convert string input to number
        const option = parseInt(input);
        handleInput(option);
    });
};

const handleInput = (option) => {
    if (option === 1) {
        rl.question("Enter the task: ", (task) => {
            todos.push(task);
            console.log(`Task "${task}" added successfully!`);
            showMenu();
        });
    }
    else if (option === 2) {
        if (todos.length === 0) {
            console.log("\nNo tasks available!");
        } else {
            console.log("\nTODO's List:");
            todos.forEach((task, index) => {
                console.log(`${index + 1}. ${task}`);
            });
        }
        showMenu();
    }
    else if (option === 3) {
        console.log('Goodbye!');
        rl.close();
    }
    else {
        console.log("Invalid Option");
        showMenu();
    }
    // console.log('--------------------------------------')
};

// Start the application
showMenu();