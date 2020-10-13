class ApiError2 extends Error {
  constructor(public message:string,public errorCode :number, res:any) {
    super(message)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError2)
    }

    this.errorCode = errorCode || 500;
    res.status(this.errorCode).send(res.json(this.message))
    
  }
}

export {ApiError2}