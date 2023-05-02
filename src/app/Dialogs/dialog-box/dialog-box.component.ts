import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Subscription, timer} from "rxjs";

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit, OnDestroy {
  constructor(public dialogRef: MatDialogRef<DialogBoxComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [string, number, number],
              public dialog: MatDialog) {
  }

  correctOption: string;
  tmpLivesLeft: number;
  tmpPoints: number;
  time: any

  progressValue = 100;
  sub: Subscription;


  ngOnInit() {
    this.correctOption = this.data[0];
    this.tmpLivesLeft = this.data[1];
    this.tmpPoints = this.data[2];
    this.timer(10);
  }

  timer(seconds: number) {
    const length = seconds * 1000;
    const start = new Date().getTime();
    const source = timer(0, 250);
    this.sub = source.subscribe(() => {
      const time = new Date().getTime();
      if (time - start > length) {
        this.onCancel();
      }
      console.log(time - start)
      this.time = seconds - Math.floor((time - start) / 1000)
      this.progressValue = 100 - 100 * (time - start) / length;
    });
  }


  onCancel(): void {
    this.sub.unsubscribe();
    this.dialogRef.close(null);
  }

  ngOnDestroy(): void {
    if (!!this.sub) {
      this.sub.unsubscribe();
    }
  }


}
