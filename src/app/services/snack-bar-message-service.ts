import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarDismiss} from "@angular/material/snack-bar";
import {SnackBarComponent} from "../Layouts/snack-bar/snack-bar.component";

@Injectable({
  providedIn: 'root'
})
export class SnackBarMessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  open(message: string, action: string, duration: number) {
    duration = duration * 1000;
    return this.snackBar.openFromComponent(SnackBarComponent, {
      data: {message, action, duration},
      //duration: duration * 1000
    });
  }

  openErrorDialog(error: any) {
    console.error(error ? error : 'Unknown Type Error !');
    let message = 'An error occurred. Please try again later.';
    if (error.error && error.error.message) {
      message = error.error.message;
    }
    this.open(message, "DISMISS", 10).afterDismissed()
      .subscribe((matSnackBarDismiss: MatSnackBarDismiss) => {
      }, (error) => {
        console.error(error);
      });
  }

}
