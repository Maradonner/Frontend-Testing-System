import {Component, Inject, OnDestroy} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnDestroy{
  progress = 100;
  sub: Subscription;
  duration: number = 0;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
              private snackBarRef: MatSnackBarRef<SnackBarComponent>) {
    this.snackBarRef.afterOpened().subscribe(
      () => {
        this.duration = this.snackBarRef.containerInstance.snackBarConfig.data.duration;
        console.log(this.duration)
        this.runProgressBar(this.duration);
      },
      error => console.error(error)
    );
  }

  resetProgressBar() {
    this.sub?.unsubscribe();
    this.progress = 100;
  }

  startAgain() {
    this.resetProgressBar();
    this.runProgressBar(this.duration);
  }

  runProgressBar(duration: number) {
    const start = new Date().getTime();
    const source = timer(0, 250);
    this.sub = source.subscribe(() => {
      const time = new Date().getTime();

      if (time - start > duration) {
        this.cleanProgressBarInterval();
      }

      this.progress = duration / 100 - 100 * (time - start) / duration;
    });
  }

  dismissWithAction() {
    this.sub?.unsubscribe();
    this.snackBarRef.dismissWithAction();
  }

  cleanProgressBarInterval() {
    this.dismissWithAction();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
