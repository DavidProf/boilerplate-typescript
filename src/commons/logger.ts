import Console from 'console'
/**
 * boolean variable that inform if logs must show in the local environment
 */
export const LOGGER_SHOW_LOCAL =
    process.env.LOGGER_SHOW_LOCAL === 'yes' ||
    process.env.NODE_ENV === 'development'
/**
 * output types
 */
enum OUTPUT_TYPE {
    default,
    json,
}
/**
 * the output type: json or text
 */
export const LOGGER_OUTPUT_TYPE: OUTPUT_TYPE =
    OUTPUT_TYPE[process.env.LOGGER_OUTPUT_TYPE]
/**
 * Log message Types
 */
export type LogMessage = string | Error | unknown
/**
 * Log level names
 */
export type LogLevelName = 'info' | 'warn' | 'error' | 'debug'

type LogArgs = { [key: string]: unknown }

const _logPrefix = {
    info: '[\x1b[92mINFO\x1b[0m]',
    warn: '[\x1b[33mWARN\x1b[0m]',
    error: '[\x1b[31mERROR\x1b[0m]',
    debug: '[\x1b[95mDEBUG\x1b[0m]'
}
/**
 * Log anything following the rules in config
 * @param {LogLevelName} level Log level name
 * @param {LogMessage} message the principal message to log
 * @param {LogArgs} args complemental args
 * @returns {void}
 */
const _log = (level: LogLevelName, message: LogMessage, ...args: LogArgs[]) => {
    if (!LOGGER_SHOW_LOCAL) return

    Console[level](_logPrefix[level], message, ...args)
}
/**
 * Log anything following the rules in config as JSON
 * @param {LogLevelName} level Log level name
 * @param {LogMessage} message the principal message to log
 * @param {LogArgs} args complemental args
 * @returns {void}
 */
const _logJSON = (
    level: LogLevelName,
    message: LogMessage,
    ...args: LogArgs[]
) => {
    if (!LOGGER_SHOW_LOCAL) return

    let composed = {}
    for (let index = 0; index < args.length; index++) {
        composed = { ...composed, ...args[index] }
    }

    Console[level](
        JSON.stringify({
            level: [level],
            message,
            data: composed
        })
    )
}
/**
 * creates a log function
 * @param {LogLevelName} level log level name
 * @returns {Function} a log function
 */
const createLogFunction = (level: LogLevelName) => {
    return LOGGER_OUTPUT_TYPE !== OUTPUT_TYPE.json
        ? (message: LogMessage, ...args: LogArgs[]) =>
            _log(level, message, ...args)
        : (message: LogMessage, ...args: LogArgs[]) =>
            _logJSON(level, message, ...args)
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
    debug: createLogFunction('debug')
}

export default logger
