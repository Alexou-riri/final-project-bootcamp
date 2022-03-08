import { config } from 'dotenv-safe';
import postgres from 'postgres';
import camelcaseKeys from 'camelcase-keys';

config();

// declare module globalThis {
//   let postgresSqlClient: ReturnType<typeof postgres> | undefined;
// }
// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
// function connectOneTimeToDatabase() {
//   // let sql;

//   // if(process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
//   //   sql =postgres();
//   //   sql = postgres({ssl: { reject}})
//   // }
//   // connect only once to the databse
//   if (!globalThis.postgresSqlClient) {
//     globalThis.postgresSqlClient = postgres();
//   }
//   const sql = globalThis.postgresSqlClient;

//   return sql;
// }

// Connect to PostgreSQL
// const sql = connectOneTimeToDatabase();

const sql = postgres();

type User = {
  id: number;
  username: string;
  company: string;
};

export async function createUser(
  username: string,
  passwordHash: string,
  company: string,
) {
  const [user] = await sql<[User]>`
    INSERT INTO users
      (username, password_hash, company)
    VALUES
      (${username}, ${passwordHash}, ${company})
    RETURNING
      id,
      username,
      company
  `;
  return camelcaseKeys(user);
}
