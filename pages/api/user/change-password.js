import { ConnectionCheckOutStartedEvent } from "mongodb";
import { getSession } from "next-auth/client";
import { dbConnection } from "../../../lib/db-connect";
import { hashPassword, verifyPassword } from "../../../lib/password-hash";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getSession({ req: req });

  const { oldPassword, newPassword } = JSON.parse(req.body);

  if (!session) {
    res.status(401).json({ message: "Not Authenticated!" });
  }

  const userEmail = session.user.email;

  let client = await dbConnection();

  const userRegitrationCollection = await client
    .db()
    .collection("user_registration");
  const user = await userRegitrationCollection.findOne({ email: userEmail });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const currentPassword = user.password;
  const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordAreEqual) {
    client.close();
    return res.status(403).json({ message: "Invalid Password!!" });
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await userRegitrationCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  return res.status(200).json({ message: "password updated!" });
}
