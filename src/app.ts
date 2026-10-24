/*
app.ts builds the Express app but doesn't start anything.
app is an ordered list. Every app.use(...) and app.get(...) appends one entry. 
A request walks that list top to bottom and stops at whichever entry sends a response.
*/


import express, { Express } from "express"
/* 
express — the value. Actually a function with properties.
It reads the package's main export — a single function,binds that function to the name express in this file
Express — a type only. TypeScript erases it at compile time, so the emitted JS just says import express from "express".
*/
import { userRouter } from "./routers/user.router.js"
import { error_handler } from "./Middlewares/error-handler.js"
import { routenotfound } from "./Middlewares/route-notfound.js"


export const app: Express = express()
/*
-express() returns a function that is also an object it holds the ordered list of handlers
We are creating an app object. application object,an empty request-handling machine,
knows how to receive an HTTP request and match it against a list of rules

-(: Express) after the variable name is a type annotation

-Exporting app while server.ts calls .listen() is the right split. 
Tests can import app and fire requests at it without ever opening a port.
*/


//Rules:
app.use(express.json())
// This will express to deserialize the request body (JSON) to Javascript object.
app.use(express.text())
// if request body is text.specific algorithms are used to deserialize specific formats.
app.use(express.urlencoded())
//parses incoming request bodies (URL) into a JavaScript object on req.body.


app.get("/health", (_request, response) => {
    response.json({
        status: "Okay!",
        timestamp: new Date().toISOString()
    }
    )
})


app.use("/users", userRouter)
/*
to make sure our main app object knows about our router.
a prefix match, and the prefix is stripped before the router sees it.
app.use() involves middleware.App object will delgate that handling to the userrouter object.
*/
app.use(routenotfound)
/*
No path argument, so it matches every request. 
But it's only reached by requests that walked past everything above without anyone sending a response.
Position in the list is doing all the work. 
app.use() sequentially registers middlewares.
*/
app.use(error_handler)
/*
At last we register our error handling middleware to gracefully handle our errors
*/

