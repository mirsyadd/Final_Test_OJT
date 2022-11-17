const Amqp = require("amqplib/callback_api");
const { isEmpty } = require("lodash");

// * Initialization Default config in localhost
const rabbitConfig = {
  url: "amqp://guest:guest@localhost",
  exchangeName: "testing-ojt", // *! exchange we can simply translate is instace of the queue,
  // *! when you produce with this exchange, you should consume with this exchange to
};
// * Initialization Connection RabbitMQ
const connectRabbitmq = function (main) {
  Amqp.connect(rabbitConfig.url, function (err, conn) {
    if (err) console.log(err, "Connection RabbitMQ Error");
    main(conn);
  });
};

// * Producer Queue -> this logic for product queue to message broker rabbitmq
const sendToQueue = function (
  conn,
  queueName,
  exchangeName,
  message,
  callback
) {
  return conn.createConfirmChannel(function (err, ch) {
    ch.assertExchange(exchangeName, "direct"); // *! exchange we can simply translate is instace of the queue,
    const params = {
      message: message,
    };
    ch.publish(
      exchangeName,
      queueName,
      new Buffer(JSON.stringify({ request: message.request, params: params }))
    );
    return callback();
  });
};

const produceQueue = function (message, queueName, callback) {
  connectRabbitmq(function (conn) {
    return sendToQueue(
      conn,
      queueName,
      rabbitConfig.exchangeName,
      message,
      function () {
        console.log("Successfuly send queue to message broker");
        return callback(null, "Transaction is being processed");
      }
    );
  });
};

// * Consumer Queue -> this logic for consume the consume queue after produced
const consumeQueue = (qName, receiveHandler) => {
  let prefetchAmount = 2;
  connectRabbitmq((conn) => {
    const exName = rabbitConfig.exchangeName;
    conn.createChannel((err, ch) => {
      ch.assertExchange(exName, "direct");
      ch.assertQueue(qName, { durable: true }, (err, q) => {
        if (err) {
          console.log(err, "Waiting for Queue Error");
          throw err;
        }
        ch.bindQueue(q.queue, exName, qName);
        ch.prefetch(prefetchAmount);
        ch.consume(
          q.queue,
          async (msg) => {
            try {
              if (isEmpty(msg)) {
                console.log("Waiting for Queue");
              } else {
                await receiveHandler(ch, msg);
              }
            } catch (error) {
              console.log(error, "Error When consume queue");
            }
          },
          {
            noAck: false,
          }
        );
      });
    });
  });
};

module.exports = {
  consumeQueue,
  produceQueue,
  sendToQueue,
};
