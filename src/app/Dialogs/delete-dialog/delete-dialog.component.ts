import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  dialogTitle:string;
  message:string;

  constructor(private dialogRef:MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA)
              private data: {dialogTitle:string, message: string})
  {
    this.dialogTitle = data.dialogTitle;
    this.message = data.message;
  }

  onConfirm(): void{
    this.dialogRef.close(true);
  }

  onCancel():void{
    this.dialogRef.close(false);
  }

}
