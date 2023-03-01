const {Kafka, ConfigSource} = require("kafkajs");

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
        const consumer = kafka.consumer({"groupId": "test"});
        console.log("Connecting...");
        await consumer.connect();
        console.log("Connected!")

        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        await consumer.run({
            "eachMessage": async result => [
                console.log(`Recieved msg ${result.message.value} on partition ${result.partition}`)
            ]
        })
       
    } catch (error) {
        console.error('Error creating kafka consumer: ', error)
    }
    finally{
        // process.exit();
    }
}