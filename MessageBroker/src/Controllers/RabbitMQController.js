const {produceQueue} = require('../Modules/RabbitMQService')

const produceController = async (req, res) => {
    try {
      produceQueue({ticketId: '123'}, 'Testing', (err) => {
        if (err) throw err;
        console.log('Success Produce Queue');
      })
    } catch (error) {
      console.log(error);
    }
  };

module.exports = produceController