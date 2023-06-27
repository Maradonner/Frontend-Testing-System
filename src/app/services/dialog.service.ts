import {Injectable} from '@angular/core';
import {CreateQuestionDialogComponent} from "../Dialogs/create-question-dialog/create-question-dialog.component";
import {DeleteDialogComponent} from "../Dialogs/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogBoxComponent} from "../Dialogs/dialog-box/dialog-box.component";
import {Router} from "@angular/router";
import {Question} from "../models/QuestionModel";
import {Data} from "../models/Data";
import {FinalDialogComponent} from "../Dialogs/final-dialog/final-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog,
              private router: Router) {}


  openAddQuestionDialog() {
    const question: Question = {
      id: 0,
      options: [],
      title: '',
      pictureUrl: ''
    }
    return this.dialog.open(CreateQuestionDialogComponent, {
      minWidth: '750px',
      minHeight: '650px',
      maxWidth: '900px',
      data: [question, "Add question"],
      autoFocus: false
    });
  }

  openEditQuestionDialog(question: Question) {
    return this.dialog.open(CreateQuestionDialogComponent, {
      minWidth: '750px',
      minHeight: '650px',
      maxWidth: '900px',
      maxHeight: '900px',
      data: [question, "Edit Task"],
      autoFocus: false
    });
  }

  openDeleteDialog(question: Question) {
    return this.dialog.open(DeleteDialogComponent, {
      data: {
        dialogTitle: 'Confirm action',
        message: 'Are you sure about that you wanna delete ' + question.title + " ?"
      },
      autoFocus: false,
      maxWidth: '600px',
      maxHeight: '300px',
    });
  }

  async openDialog(correctAnswer: string, livesLeft: number, score: number): Promise<Data> {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      maxWidth: '600px',
      minWidth: '600px',
      maxHeight: '280px',
      minHeight: '280px',
      data: [correctAnswer, livesLeft, score],
      autoFocus: false,
      disableClose: true
    });
    return dialogRef.afterClosed()
      .toPromise()
      .then(result => {
        if (result == "startAgain") {
          this.router.navigate(['/choose'])
          return Promise.resolve(result);
        }
        return Promise.resolve(result);
      });
  }

  async openEndGameDialog(): Promise<Data> {
    const dialogRef = this.dialog.open(FinalDialogComponent, {
      maxWidth: '600px',
      minWidth: '600px',
      maxHeight: '280px',
      minHeight: '280px',
      autoFocus: false,
      disableClose: true
    });
    return dialogRef.afterClosed()
      .toPromise()
      .then(result => {
        if (result) {
          window.location.reload();
          //this.router.navigate(['/choose'])
          return Promise.resolve(result);
        }
        this.router.navigate(['/choose'])
        return Promise.resolve(result);
      });
  }


}
