const { kafka } = require("./client");

const readline = require("readline");

// via this interface we will ask user for input and use the output as messages to be sent via our producer
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();
  console.log("connecting producer");

  await producer.connect();
  console.log("producer connected successfully");

  rl.setPrompt("Give name and location -> ");
  rl.prompt();

  //  according to user input the message will be sent to our kafka client
  rl.on("line", async (line) => {
    const [rider, location] = line.split(" ");

    await producer.send({
      topic: "rider-details",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({ name: rider, location: location }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
    console.log("Producer disconneted..");
  });
}

init();
