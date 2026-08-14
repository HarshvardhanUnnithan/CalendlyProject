import { app } from "./app.js"
import { PORT } from "./config/env.js"

export function startserver() {
    app.listen(PORT, () => {
        console.log(`[Server]:Running on Port ${PORT}`)
    })
}

startserver()