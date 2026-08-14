import express from "express"

export const app = express()


app.get("/health", (request, response) => {
    response.json({
        status: "Okay",
        timestamp: new Date().toISOString()
    }
    )
})


