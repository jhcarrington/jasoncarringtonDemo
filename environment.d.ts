declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_domain: string,
            REACT_APP_gcpImageBucket: string,
            NODE_ENV: 'development' | 'production',
            PORT?: string,
            PWD: string,
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
