import { stdout, stderr } from 'process'
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
    json
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
export enum LogLevelName {
    info = 'info',
    warn = 'warn',
    error = 'error',
    debug = 'debug'
}

type LogArgs = { [key: string]: unknown }

const _logPrefix = {
    info: '[\x1b[92mINFO\x1b[0m]',
    warn: '[\x1b[33mWARN\x1b[0m]',
    error: '[\x1b[31mERROR\x1b[0m]',
    debug: '[\x1b[95mDEBUG\x1b[0m]'
}
const _streamMap = {
    [LogLevelName.info]: stdout,
    [LogLevelName.debug]: stdout,
    [LogLevelName.warn]: stderr,
    [LogLevelName.error]: stderr
}
/**
 * returns the standard output stream for the system
 * @param {LogLevelName} level Log level name
 * @returns {stdout|stderr} standard stream
 */
const _getStandardStream = (level: LogLevelName) => _streamMap[level]
/**
 * compose args in a object
 * @param {LogArgs[]} args args to compose
 * @returns {*|null} the object composed or null
 */
const _composeArgs = (args: LogArgs[]) => {
    let composed: { [key: string]: unknown } | null = null
    for (let index = 0; index < args.length; index++) {
        composed = { ...(composed ?? {}), ...args[index] }
    }
    return composed
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

    if (LOGGER_OUTPUT_TYPE !== OUTPUT_TYPE.json) {
        _getStandardStream(level).write(
            `${_logPrefix[level]} ${message} ${
                args.length ? JSON.stringify(_composeArgs(args)) : ''
            }\n`
        )
    } else {
        _getStandardStream(level).write(
            `${JSON.stringify({
                level: level,
                message,
                data: _composeArgs(args)
            })}\n`
        )
    }
}
/**
 * creates a log function
 * @param {LogLevelName} level log level name
 * @returns {Function} a log function
 */
const createLogFunction = (level: LogLevelName) => {
    return (message: LogMessage, ...args: LogArgs[]) =>
        _log(level, message, ...args)
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
    info: createLogFunction(LogLevelName.info),
    /**
     * Log a warn
     * @param message the principal message to log
     * @param args complemental args
     */
    warn: createLogFunction(LogLevelName.warn),
    /**
     * Log an error
     * @param message the principal message to log
     * @param args complemental args
     */
    error: createLogFunction(LogLevelName.error),
    /**
     * Log for debug
     * @param message the principal message to log
     * @param args complemental args
     */
    debug: createLogFunction(LogLevelName.debug)
}

export default logger
