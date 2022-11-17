const config = require('../config/DatabaseRedis.json');
const redis = require('redis');

const client = redis.createClient(config.REDIS_PORT, config.REDIS_HOST);

client.on('error', (err) => console.log('REDIS CLIENT ERROR'));

module.exports = client;