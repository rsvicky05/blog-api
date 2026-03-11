const { createClient } = require('redis');

const cacheClient = createClient({
  url: 'redis://localhost:6379'
});

cacheClient.on('error', (err) =>
  console.error('Redis Client Error', err)
);

(async () => {
  await cacheClient.connect();
  console.log('Redis Connected');
})();

module.exports = cacheClient;