import mongoose from "mongoose";
import User from "../../mongo/User";

export default async function register(req, res) {
  switch (req.method) {
    case "POST":
      const { username, email, password } = req.body;

      console.log(username, password, email);

      try {
        await mongoose.connect(process.env.MONGODB);
        const userByEmail = await User.findOne({ email: email });
        if (userByEmail) {
          console.log("eee");
          res.json({ message: "The email already exists" });
          return mongoose.connection.close();
        }
        console.log(userByEmail);
        const userByUsername = await User.findOne({ username: username });
        if (userByUsername) {
          console.log("eee");
          res.json({ message: "The username already exists" });
          return mongoose.connection.close();
        }
        console.log(userByUsername);
        const newUser = new User({
          username,
          email,
          password,
          posts: [],
        });

        const result = await newUser.save();
        res.json({ message: "Successfully", status: 200 });
        return mongoose.connection.close();
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
      }

    default:
      return res.status(403);
  }
}
