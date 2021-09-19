declare global {
    namespace NodeJS {
        interface ProcessEnv {
            // app
            /**
             * app name
             */
            APP: string
            /**
             * app environment
             */
            NODE_ENV: 'development' | 'production'

            // logger
            /**
             * enable logs in the local environment
             */
            LOGGER_SHOW_LOCAL: 'yes' | undefined
            /**
             *
             */
            LOGGER_OUTPUT_TYPE: 'default' | 'json'

            // set undefined to force declaration here
            [key: string]: undefined
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
