import Console from 'console'

/**
 * boolean variable that inform if logs must show in the local environment
 */
export let LOGGER_SHOW_LOCAL =
    process.env.LOGGER_SHOW_LOCAL === 'yes' ||
    process.env.NODE_ENV === 'development'

/**
 * Log message Types
 */
export type LogMessage = string | Error | unknown
/**
 * Log Types
 */
export type LogType = 'info' | 'warn' | 'error' | 'debug'

const _logPrefix = {
    info: '[\x1b[92mINFO\x1b[0m]',
    warn: '[\x1b[33mWARN\x1b[0m]',
    error: '[\x1b[31mERROR\x1b[0m]',
    debug: '[\x1b[95mDEBUG\x1b[0m]',
}
/**
 * Log anything following the rules in config
 * @param type Log type
 * @param message the principal message to log
 * @param args complemental args
 */
const _log = (type: LogType, message: LogMessage, ...args: unknown[]) => {
    if (!LOGGER_SHOW_LOCAL) return

    Console[type](_logPrefix[type], message, ...args)
}
/**
 * creates a log function
 * @param type log type
 * @returns a log function
 */
const createLogFunction = (type: LogType) => {
    return (message: LogMessage, ...args: unknown[]) => {
        _log(type, message, ...args)
    }
}
/**
 * logger helper
 */
export const logger = {
    /**
     * Log an info
     * @param message the principal message to log
     * @param args complemental args
     */
    info: createLogFunction('info'),
    /**
     * Log a warn
     * @param message the principal message to log
     * @param args complemental args
     */
    warn: createLogFunction('warn'),
    /**
     * Log an error
     * @param message the principal message to log
     * @param args complemental args
     */
    error: createLogFunction('error'),
    /**
     * Log for debug
     * @param message the principal message to log
     * @param args complemental args
     */
    debug: createLogFunction('debug'),
}

export default logger
