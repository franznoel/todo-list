import knexConfig from '@knexConfig';

import * as dotenv from 'dotenv';
dotenv.config();

const stage = process.env.STAGE || 'development';
const knexDb = require('knex')(knexConfig[stage]);

export default knexDb;
