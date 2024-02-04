// this file contains the configuration for creating the topics and partitions etc.

const { kafka } = require("./client");

async function init() {
  // creating an admin from the kafka client
  const admin = kafka.admin();
  console.log("Creating Admin");

  // starting the admin
  admin.connect();
  console.log("Admin creation success");

  console.log("Creating topic 'rider details'");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-details",
        numPartitions: 2,
      },
    ],
  });

  console.log("Created topic 'rider-details'");

  console.log("disconnecting admin..");
  await admin.disconnect();
  console.log("admin disconnected");
}

init();
