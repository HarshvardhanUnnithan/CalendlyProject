/*
server.ts is your entry point.It's the only file in the project allowed to have side effects-
opening a database connection and binding a network port.
*/

import { app } from "./app.js"
import { connectdatabase } from "./config/database.js"
import { PORT } from "./config/env.js"


async function startserver() {
    await connectdatabase()
    app.listen(PORT, () => {
        console.log(`[Server]:Running on Port ${PORT}`);
    })
}

/*
async forces a Promise return.
Any async function returns a Promise, even one that returns nothing. That's what makes the .catch() at the bottom possible.
await enforces ordering.
*/

/*
app.listen(PORT, callback): listen() asks the operating system to reserve a port and forward every TCP connection arriving there
 to your process.It does not block. It returns immediately (returning an http.Server object you're currently discarding), 
and the callback fires later, once the OS has actually granted the binding.
*/

startserver().catch((error) => {
    console.error("Port Error: ", error);
    process.exit(1);

})

/*
Without .catch(), a rejected Promise becomes an unhandled rejection,
if port is already in use then .linten() can throw an error.
Gracefull way to exit if error occurs during app.listen().
*/

