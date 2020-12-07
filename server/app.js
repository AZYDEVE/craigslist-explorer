const expressServer = require("./server");
const config = require("./config/config");
const mongoClient = require("./config/mongoClient");

let server;

// On startup make connection with the mongo db
mongoClient.initConnection().then(() => {
  server = expressServer.listen(config.port, () => {
    console.info(`Listening to port ${config.port}`);
  });
});

// On unexpected error correctly close the server
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  console.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
