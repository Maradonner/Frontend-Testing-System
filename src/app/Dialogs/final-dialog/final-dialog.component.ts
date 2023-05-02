import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-final-dialog',
  templateUrl: './final-dialog.component.html',
  styleUrls: ['./final-dialog.component.css']
})
export class FinalDialogComponent {
  constructor(public dialogRef: MatDialogRef<FinalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: [string, number, number],
              public dialog: MatDialog) {
  }

  onConfirm(): void {
    this.dialogRef.close("startAgain");
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

}
