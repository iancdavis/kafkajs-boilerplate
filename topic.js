const {Kafka} = require("kafkajs");

run();
async function run(){
    try {
        //establish tpc connection to talk to broker
        const kafka = new Kafka({
            "clientId": "myapp",
            //brokers takes an array for data persistence if one instance goes down
            "brokers": ["127.0.0.1:9092"]
        })

        //create admin interface, allows us to create topics
        const admin = kafka.admin();
        console.log("Connecting...");
        await admin.connect();
        console.log("Connected!")
        //create a topic
        admin.createTopics({
            //takes an array because you can create multiple topics at once
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        })
        console.log("Created topic successfully!");
        await admin.disconnect();
    } catch (error) {
        console.error('Error creating kafka topic: ', error)
    }
    finally{
        process.exit();
    }
}