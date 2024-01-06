import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from "http";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(`app is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();


// unhandledRejection process, shut down the server
process.on("unhandledRejection", () => {
  console.log("😈 unhandledRejection detected, shutting down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// uncaughtException process, shut down the server
process.on("uncaughtException", () => {
  console.log("😈 uncaughtException detected, shutting down...");
  process.exit(1);
});