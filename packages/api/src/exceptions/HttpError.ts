export class HttpError extends Error {
  private statusCode: number;

  constructor(statusCode: number, message?: string) {
    super(message || `HttpError: ${statusCode}`);
    this.name = "Shifter Shop Error";
    this.statusCode = statusCode;
  }

  get status() {
    return this.statusCode;
  }

  toJson(): JsonError {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

interface JsonError {
  statusCode: number;
  message: string;
}
