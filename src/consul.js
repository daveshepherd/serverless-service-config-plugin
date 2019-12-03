const request = require('request-promise-native');

async function get(url) {
  if (!process.env.CONSUL_TOKEN) {
    throw new Error('Missing consul token for authentication, you need to set CONSUL_TOKEN as a environment variable');
  }

  const consulData = await request({
    url,
    headers: {
      'X-Consul-Token': process.env.CONSUL_TOKEN
    },
    json: true,
  });

  if (consulData && consulData[0] && consulData[0].Value) {
    return Buffer.from(consulData[0].Value, 'base64').toString();
  }
  throw new Error(`Missing value at ${url}`);
}

module.exports = {
  get,
};
