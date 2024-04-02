// import { Pool } from 'pg';
import pg from 'pg';

//poderia fazer na linha 7 new pg.Pool e não ter a linha 5
const { Pool } = pg;

export const config = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'dc_22',
    password: 'col@123',
    port: 5432,
})