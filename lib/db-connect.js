import { MongoClient } from "mongodb";

export async function dbConnection() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.zyfb8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  );
  return client;
}
