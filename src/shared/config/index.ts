const { NODE_ENV } = process.env;
const env = NODE_ENV || 'local';
const url = `./${env}.json`;
const config = require(`${url}`); // eslint-disable-line import/no-dynamic-require

export { config };
