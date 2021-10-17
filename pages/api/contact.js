import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phoneNumber, message } = JSON.parse(req.body);

    const newMessage = { name, email, phoneNumber, message };

    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://shatish_desai:JrBuYFeRYxEgecNg@cluster0.zyfb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect with database" });
      return;
    }

    const db = client.db();

    try {
      await db.collection("messages").insertOne(newMessage);
      res.status(201).json({ message: "message sent" });
    } catch (error) {
      res.status(500).json({ message: "message sent failed!!" });
      return;
    }
    client.close();
  } else {
    let client;
    try {
      client = await MongoClient.connect(
        "mongodb+srv://shatish_desai:JrBuYFeRYxEgecNg@cluster0.zyfb8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect with database" });
      return;
    }
    const db = client.db();
    let messageData;
    try {
      messageData = await db.collection("messages").find({}).toArray();
    } catch (error) {
      res.status(500).json({ message: "soemthing went wrong" });
    }

    res.status(200).send(messageData.length);
  }
}
