const { Kafka } = require("kafkajs");

// creating kafka client
exports.kafka = new Kafka({
  clientId: "my-app",
  brokers: ["192.168.0.106:9092"],
});
