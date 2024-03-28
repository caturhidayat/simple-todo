// db.js
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL || '' // Provide a default value for connectionString
const sql = postgres(connectionString)

export default sql
