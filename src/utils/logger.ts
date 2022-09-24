


export class JasonLogger {
    constructor(
        private loggerLocation: string
    ) { }

    error(message: string, meta?: any) {
        console.log(`${this.loggerLocation} - Error: ${message}`, meta);
    }

    warn(message: string, meta?: any) {
        console.log(`${this.loggerLocation} - Warning: ${message}`, meta);
    }

}