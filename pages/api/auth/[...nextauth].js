import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/password-hash";
import { dbConnection } from "../../../lib/db-connect";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credential) {
        const client = await dbConnection();

        const usersCollection = client.db().collection("user_registration");
        const user = await usersCollection.findOne({
          email: credential.email,
        });

        if (!user) {
          client.close();
          throw new Error("User Not Found");
        }
        const isValid = await verifyPassword(
          credential.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Username or Password are Wrong!");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
