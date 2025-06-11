import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tickets = [];
let ticketId = 1; // Start ticket IDs from 1

const showMenu = () => {
    console.log("\n=== Ticket Booking System ===");
    console.log("1. Book Ticket");
    console.log("2. View Tickets");
    console.log("3. Cancel Ticket");
    console.log("4. Exit");
    console.log("===========================");

    rl.question("\nChoose an option: ", (input) => {
        const option = parseInt(input);
        if (isNaN(option)) {
            console.log("\nPlease enter a valid number!");
            showMenu();
        } else {
            handleInput(option);
        }
    });
};

const bookTicket = (ticketDetails) => {
    tickets.push(ticketDetails);
    console.log("\n=== Ticket Booked Successfully ===");
    console.log(`Ticket ID: ${ticketDetails.id}`);
    console.log(`Passenger: ${ticketDetails.name}`);
    console.log(`Age: ${ticketDetails.age}`);
    console.log(`Destination: ${ticketDetails.destination}`);
    console.log(`Travel Date: ${ticketDetails.date}`);
    console.log(`Booking Date: ${ticketDetails.bookingDate}`);
    console.log("=================================");
    showMenu();
};

const viewTickets = () => {
    if (tickets.length === 0) {
        console.log("\nNo tickets booked yet.");
    } else {
        console.log("\n=== Booked Tickets ===");
        console.table(tickets, ['id', 'name', 'age', 'destination', 'date']);
        console.log(`Total Tickets: ${tickets.length}`);
    }
    showMenu();
};

const cancelTicket = (id) => {
    const ticketIndex = tickets.findIndex(t => t.id === id);
    if (ticketIndex !== -1) {
        const cancelledTicket = tickets.splice(ticketIndex, 1)[0];
        console.log(`\nTicket ID ${cancelledTicket.id} for ${cancelledTicket.name} has been cancelled.`);
    } else {
        console.log(`\nTicket with ID ${id} not found.`);
    }
    showMenu();
};

const handleInput = (option) => {
    switch(option) {
        case 1:
            rl.question("\nEnter passenger name: ", (name) => {
                rl.question("Enter passenger age: ", (age) => {
                    if (isNaN(age) || age < 1 || age > 120) {
                        console.log("\nPlease enter a valid age (1-120)");
                        showMenu();
                        return;
                    }
                    rl.question("Enter destination: ", (destination) => {
                        rl.question("Enter travel date (YYYY-MM-DD): ", (date) => {
                            if (!isValidDate(date)) {
                                console.log("\nPlease enter a valid date in YYYY-MM-DD format");
                                showMenu();
                                return;
                            }
                            const ticketDetails = {
                                id: ticketId++,
                                name: name.trim(),
                                age: parseInt(age),
                                destination: destination.trim(),
                                date: date,
                                bookingDate: new Date().toISOString().split('T')[0]
                            };
                            bookTicket(ticketDetails);
                        });
                    });
                });
            });
            break;

        case 2:
            viewTickets();
            break;

        case 3:
            if (tickets.length === 0) {
                console.log("\nNo tickets to cancel.");
                showMenu();
                return;
            }
            console.log("\nCurrent Tickets:");
            tickets.forEach(t => console.log(`ID: ${t.id} - ${t.name} (${t.destination})`));
            rl.question("\nEnter ticket ID to cancel (or 0 to go back): ", (input) => {
                const id = parseInt(input);
                if (id === 0) {
                    showMenu();
                } else if (isNaN(id)) {
                    console.log("\nPlease enter a valid number!");
                    showMenu();
                } else {
                    cancelTicket(id);
                }
            });
            break;

        case 4:
            console.log("\nThank you for using our Ticket Booking System!");
            rl.close();
            break;

        default:
            console.log("\nInvalid option! Please choose 1-4.");
            showMenu();
    }
};

const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;
    const d = new Date(dateString);
    return !isNaN(d) && d.toISOString().slice(0,10) === dateString;
};

console.log("Welcome to the Ticket Booking System!");
showMenu();