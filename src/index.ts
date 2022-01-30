import './pre-start'; // Must be the first import
import { httpServer } from '@server';
import logger from '@shared/Logger';
import { sequelize } from './db';

// Start the server
const port = Number(process.env.PORT || 3001);
httpServer.listen(port, () => {
    logger.info('Express server started on port: ' + port);
    console.log(process.env.DATABASE_URL)
    // Testing the connection
    try{
        sequelize.authenticate()
        console.log('Connection has been established ')
    }catch(error) {
        console.error("Unable to connect to the database:", error)
        
    }
    
});
