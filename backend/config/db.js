import mongoose from "mongoose";

export async function connetDB() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected On : " + connection.connection.host);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}
