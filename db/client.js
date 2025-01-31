// import { Client } from 'pg';

import pkg from 'pg';
const { Client } = pkg;

const client = new Client('postgres://localhost:5432/bcrypt_jwt')

// module.exports = client;
export { client };