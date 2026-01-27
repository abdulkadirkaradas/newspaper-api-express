export class APIError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: object
  ) {
    super(message);
    this.name = "APIError";
  }
}