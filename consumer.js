const { kafka } = require("./client");
const group = process.argv[2];

async function init() {
  const consumer = kafka.consumer({ groupId: group });

  await consumer.connect();
  console.log("Consumer connected");

  await consumer.subscribe({ topics: ["rider-details"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        ` Topic: ${topic}, Partition: ${partition}`,
        message.value.toString()
      );
    },
  });

  // await consumer.disconnect();
}
init();
