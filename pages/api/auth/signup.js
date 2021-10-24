import { dbConnection } from "../../../lib/db-connect";
import { hashPassword } from "../../../lib/password-hash";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { full_name, email, password } = JSON.parse(req.body);

    let client = await dbConnection();

    const db = await client.db();

    let userIsExist;

    try {
      userIsExist = await db
        .collection("user_registration")
        .findOne({ email: email });
    } catch {
      return res.status(500).json({ message: "message sent failed!!" });
    }

    if (userIsExist) {
      return res.status(422).json({ message: "user already exist" });
    }

    const user_info = {
      full_name,
      email,
      password: await hashPassword(password),
    };

    try {
      await db.collection("user_registration").insertOne(user_info);
      return res.status(201).json({ message: "message sent" });
    } catch (error) {
      return res.status(500).json({ message: "message sent failed!!" });
    }
    client.close();
  }
}
