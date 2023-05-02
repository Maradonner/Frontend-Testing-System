import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {SnackBarMessageService} from "./snack-bar-message-service";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor(
    private errorDialogService: SnackBarMessageService,
    private zone: NgZone
  ) {}

  handleError(error: any): void
  {
    console.error('Error from global error handler', error);

    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    this.zone.run(() =>
      this.errorDialogService.openErrorDialog(error)
    );
  }
}
