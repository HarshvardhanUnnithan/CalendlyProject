import "dotenv/config" // dotenv opens your .env file, reads every KEY=value line, and stuffs them into process.env

export const PORT = Number(process.env.PORT) || 3000
//Every file is its own private box,export is you saying: this one is public — other files are allowed to grab it.

export const DATABASE_URL = process.env.DATABASE_URL || ""

export const NodeEnv = process.env.NODE_ENV