import postgres from "postgres";

const connectionString = process.env.SUPABASE_URL as string;
const sql = postgres(connectionString);

export default sql;
