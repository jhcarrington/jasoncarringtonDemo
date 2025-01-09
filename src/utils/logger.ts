export class JasonLogger {
  constructor(private readonly loggerLocation: string) {}

  error(message: string, meta?: any): void {
    console.log(`${this.loggerLocation} - Error: ${message}`, meta);
  }

  warn(message: string, meta?: any): void {
    console.log(`${this.loggerLocation} - Warning: ${message}`, meta);
  }
}
