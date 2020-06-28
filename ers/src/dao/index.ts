import { Pool } from 'pg'


//build Connection Pool
export const connectionPool: Pool  = new Pool ({
    host: process.env['LB_HOST'],
    user: process.env['LB_USER'],
    password: process.env['LB_PASSWORD'],
    database: process.env['LB_DATABASE'],
    port:5432,
    max: 5
}
    
)
