const {Kafka} = require("kafkajs");
const msg = process.argv[2];
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
        const producer = kafka.producer();
        console.log("Connecting...");
        await producer.connect();
        console.log("Connected!")
       
        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic": "Users",
            "messages": [
                {
                    "value": msg,
                    // "partition": partition
                }
            ]
        })
        console.log("sent successfully! ", JSON.stringify(result));
        await producer.disconnect();
    } catch (error) {
        console.error('Error creating kafka producer: ', error)
    }
    finally{
        process.exit();
    }
}