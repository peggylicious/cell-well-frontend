import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler } from "@angular/core";

export class GlobalErrorHandler implements ErrorHandler{
  handleError(error: any): void {
    // Check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      console.log('Not an instance')
      error = error.rejection; // get the error object
    }
    console.log('Is an instance')

  }
}
