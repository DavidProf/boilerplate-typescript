import logger from './logger'
/**
 * waits 3 seconds then shutdown app
 * @param {Error?} e optional error entry as reason for shutdown
 * @returns {void}
 */
export const shutdown = async (e?: Error): Promise<void> => {
    logger.warn(`${process.env.APP}(${process.pid}) - graceful shutdown`, {
        action: 'shutdown',
        error: e?.message,
        stack: e?.stack
    })
    await new Promise((resolve) => setTimeout(() => resolve(0), 3000))
    process.exit(0)
}
/**
 * add hooks/listeners to unhandled errors and exit signals
 * @returns {void}
 */
const setHooks = (): void => {
    process.on('SIGINT', () => shutdown())
    process.on('uncaughtException', (e: Error) => shutdown(e))
    process.on('unhandledRejection', (e: Error) => shutdown(e))
}

setHooks()
