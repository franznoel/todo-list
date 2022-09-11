import knexConfig from '@knexConfig';

import * as dotenv from 'dotenv';
dotenv.config();

const stage = process.env.STAGE || 'development' as string;
console.log('stage', stage)
const knexDb = require('knex')(knexConfig[stage]);

export default knexDb;
