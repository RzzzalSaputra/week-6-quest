const mongoose = require("mongoose");
const seed = require("./seed.json");
require("dotenv").config();

async function main() {
  /**--------------- Not allowed to be edited - start - --------------------- */
  const mongoUri = process.env.MONGODB_URI;
  const collection = process.env.MONGODB_COLLECTION;

  const args = process.argv.slice(2);

  const command = args[0];
  /**--------------- Not allowed to be edited - end - --------------------- */

  // Connect to MongoDB
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Define a schema for the collection
  const schema = new mongoose.Schema(
  {
    title: String,
    year: Number,
    genre: [String],
    description: String,
    director: String,
    cast: [String],
  }, { strict: false });

  const Model = mongoose.model(collection, schema);

  switch (command) {
    case "check-db-connection":
      await checkConnection();
      break;
    case "reset-db":
      await reset_db(Model);
      break;
    case "bulk-insert":
      await bulk_insert(Model, seed);
      break;
    // TODO: Buat logic fungsionalitas yg belum tersedia di bawah
    default:
      throw Error("command not found");
  }

  await mongoose.disconnect();
  return;
}

async function checkConnection() {
  console.log("check db connection started...");
  try {
    await mongoose.connection.db.admin().ping();
    console.log("MongoDB connection is successful!");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
  }
  console.log("check db connection ended...");
}

// To Reset DB
async function reset_db(Model) {
  console.log("reset-db started...");
  try {
    await Model.deleteMany({});
    console.log("MongoDB reset-db successfull!");
  } catch (err) {
    console.error("MongoDB reset-db failed:", err);
  }
  console.log("reset db process ended...");
}

// To Bulk-insert DB
async function bulk_insert(Model, fileSeed) {
  console.log("bulk-insert started...");
  try {
    await Model.insertMany(fileSeed);
    console.log("MongoDB bulk-insert successfull!");
  } catch (err) {
    console.error("MongoDB bulk-insert failed:", err);
  }
  console.log("bulk-insert db process ended...");
}

main();
