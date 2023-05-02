import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {catchError, lastValueFrom, of, Subject, takeUntil, tap} from "rxjs";
import {QuizService} from "../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SnackBarMessageService} from "../../services/snack-bar-message-service";
import {DialogService} from "../../services/dialog.service";
import {Data} from "../../models/Data";
import {AnswerDTO} from "../../models/AnswerDTO";
import {Option} from "../../models/OptionModel";
import {ContinueTriviaResponse} from "../../models/ContinueTriviaResponse";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnDestroy {
  constructor(private dialog: MatDialog,
              private quizService: QuizService,
              private route: ActivatedRoute,
              private snackBarMessageService: SnackBarMessageService,
              private router: Router,
              private dialogService: DialogService) {
  }

  data: Data;
  answerDTO: AnswerDTO;
  selectedOption: Option;
  myOption: Option;
  quizId: number
  progress: number = 0;
  destroyed$ = new Subject();


  ngOnInit() {
    this.route.queryParams.pipe(
      takeUntil(this.destroyed$)).subscribe(params => {
      this.quizId = params['id'];
      this.getData(this.quizId);
    });
  }


  async getData(id: number) {
    this.quizService.gameStart(id).pipe(
      tap(response => this.data = response),
      catchError(error => {
        this.snackBarMessageService.openErrorDialog(error);
        return of(null);
      }),
      takeUntil(this.destroyed$)).subscribe();
  }


  ngOnDestroy(): void {
    this.destroyed$.next(null);
    this.destroyed$.complete();
  }

  async postData(option: Option) {
    if (option == null) {
      return;
    }
    this.selectedOption = option;
    const dataToServer: AnswerDTO = new AnswerDTO(option.id, option.triviaQuestionId, this.data.activeId)
    const answer$ = this.quizService.continueTrivia(dataToServer);
    const answer: ContinueTriviaResponse | void = await lastValueFrom(answer$).catch(error => {
      this.snackBarMessageService.openErrorDialog(error);
    });
    if (!answer) {
      return;
    }

    console.log(answer)

    this.myOption = {
      isCorrect: answer?.isCorrect,
      title: this.selectedOption.title,
      triviaQuestionId: this.selectedOption.triviaQuestionId,
      //triviaQuestionId: answer?.question.question.id,
      id: this.selectedOption.id
    }

    if (this.myOption.isCorrect) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else if (!answer.isFinished) {
      await this.dialogService.openDialog(answer.correctAnswer, answer.livesLeft,
        answer.livesCount);
    }

    if (answer.isFinished) {
      await this.dialogService.openEndGameDialog();
      return;
    }

    this.data = answer.question;
  }


}
