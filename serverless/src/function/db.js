const { Pool } = require("/opt/node_modules/pg");

let pool;

const createPool = () => {
   return new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: parseInt(process.env.DB_PORT || "5432"),
      ssl: {
         rejectUnauthorized: false,
      },
      max: 1,
      idleTimeoutMillis: 120000,
   });
};

const checkPgVectorExtension = async (client) => {
   const extResult = await client.query(`
    SELECT 1 FROM pg_extension WHERE extname = 'vector'
  `);
   if (extResult.rows.length === 0) {
      console.log("pgvector extension not found. Installing...");
      await client.query("CREATE EXTENSION IF NOT EXISTS vector");
      console.log("pgvector extension installed");
   } else {
      console.log("pgvector extension is already enabled");
   }
};

const createTablesIfNotExist = async (client) => {
   await client.query(`
    CREATE TABLE IF NOT EXISTS conversations (
      id UUID PRIMARY KEY,
      title TEXT NOT NULL,
      conversation JSONB NOT NULL,
      embedding vector(768),
      user_id UUID NOT NULL
    )
  `);
   console.log("Tables created or already exist");
};

const getDb = async () => {
   if (!pool) {
      pool = createPool();

      pool.on("connect", () => {
         console.log("Database connection established");
      });

      pool.on("error", (err) => {
         console.error("Unexpected error on idle client", err);
         process.exit(-1);
      });
   }

   // Check the connection and perform initial setup
   try {
      const client = await pool.connect();
      console.log("Successfully connected to the database");

      await checkPgVectorExtension(client);
      await createTablesIfNotExist(client);

      client.release();
      return pool;
   } catch (error) {
      console.error("Error connecting to the database:", error.message);
      throw new Error("Unable to connect to the database");
   }
};

module.exports = {
   query: async (text, params) => {
      const db = await getDb();
      return db.query(text, params);
   },
   getDb,
};
