import 'dotenv/config'
import './commons/gracefulShutdown'
import logger from './commons/logger'
    ; (async () => {
        try {
            logger.info('initializing service')

            setInterval(() => console.log('just logging'), 1000)

            logger.info('service initiated')
        } catch (e) {
            logger.error('error trying to initiate service')
            process.exit(1)
        }
    })()
