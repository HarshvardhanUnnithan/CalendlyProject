// this file is for connecting to the database.

import { PrismaClient } from "../generated/prisma/client.js"
import { PrismaPg } from "@prisma/adapter-pg"
import { DATABASE_URL } from "./env.js"


const adapter = new PrismaPg({ connectionString: DATABASE_URL })

/*
To makes sure prisma has all the correct configuration to connect to pgsql. the adapter takes a configuration object.
makes prisma compatible with PG. pg, an ordinary Node library.our adapter is now ready.
the adapter is what lets Prisma use a real Node.js Postgres driver (pg) instead of its own built-in engine.
routes Prisma's queries through the pg driver instead of Prisma's own connection layer.
adapter replaced opening the connection and executing the statement.
*/


export const prisma = new PrismaClient({ adapter })

/*
Now we need to create a prisma client object,which will use the above created adapter.
prisma client is a query builder.
Tells Prisma: don't try to connect on your own — send every query through this adapter.
*/


export async function connectdatabase() {
    try {
        await prisma.$connect()
    }
    catch (error) {
        console.error("Connection Failure", error)
        process.exit(1)
    }
}

/*
.$connect() is where Prisma actually opens a TCP socket to Postgres, authenticates with your credentials,
and gets a connection ready. That's real network work — it takes time. Drop that await and your server starts
accepting requests before the database is confirmed

what await does with that Promise:

It suspends this function until the Promise settles. Not the whole program — just this function.
Node returns to its event loop and keeps handling other work. When Postgres finally responds,
your function resumes at exactly that line. 

It unwraps the value. await somePromise evaluates to the fulfilled value, not the Promise itself.

If the Promise rejects, await throws. This is the piece people miss. await converts a
rejected Promise into a normal thrown exception — which is the only reason your try/catch works here.
Without await, there is nothing to throw, and the catch block would never fire.
*/