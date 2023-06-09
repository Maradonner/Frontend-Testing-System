import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {MatDialog} from "@angular/material/dialog";
import {QuizService} from "../../services/quiz.service";
import {HttpClient} from "@angular/common/http";
import {SnackBarMessageService} from "../../services/snack-bar-message-service";
import {DialogService} from "../../services/dialog.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Question} from "../../models/QuestionModel";
import {Quiz} from "../../models/QuizModel";
import {autoSave} from "../create-exam-page/AutoSave";
import {Subject} from "rxjs";
import {FileUploadService} from "../../services/file-upload.service";
import {QuizNotificationService} from "../../services/quiz-notification.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

let key$ = new Subject<string>();

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit, OnDestroy{
  constructor(private service: QuestionService,
              private dialog: MatDialog,
              private quizService: QuizService,
              private http: HttpClient,
              private snackBarMessageService: SnackBarMessageService,
              private dialogService: DialogService,
              private fb: FormBuilder,
              private fileUploadService: FileUploadService,
              private quizNotificationService: QuizNotificationService,
              ) {
  }

  notifications: { quizId: number; quizTitle: string; userName: string }[] = [];

  ngOnInit():void {
    setTimeout(() => key$.next(this.key));
    this.quizNotificationService.startConnection();
    this.quizNotificationService.onQuizCreated((quizId, quizTitle, userName) => {
      this.notifications.push({ quizId, quizTitle, userName });
    });
  }

  ngOnDestroy():void {

  }

  @Input() mode: 'create' | 'update';
  @Input() key: string = '';

  @Input("quiz")
  set setQuestions(quiz: Quiz) {
    if (quiz == null) {
      return;
    }


    this.form.get("pictureUrl").setValue(quiz.pictureUrl);
    this.form.get("title").setValue(quiz.title);
    // @ts-ignore
    this.form.get("questionTime").setValue(quiz.questionTime);
    // @ts-ignore
    this.form.get("accumulateTime").setValue(quiz.accumulateTime);
    // @ts-ignore
    this.form.get("livesCount").setValue(quiz.livesCount);
    // @ts-ignore
    this.form.get("questions").setValue(quiz.questions);
  }

  @autoSave(key$)
  form = this.fb.group({
    pictureUrl: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
    questionTime: ['', [Validators.required, Validators.min(10), Validators.max(300)]],
    accumulateTime: ['', Validators.required],
    livesCount: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
    questions: [[], Validators.required],
  });

  files: File[] = [];
  file: File;
  url: any;
  questions: Question[] = [];
  selectedFile: File = null;
  tmpLink: any = "https://cdn.midjourney.com/021b629c-cf63-4021-acd8-bbe71081948b/grid_0.png";
  tmpTitle: string;
  tmpQuestionTime: number;
  tmpAccumulateTime: boolean;
  tmpLivesCount: number;


  quiz: Quiz = {
    id: 0,
    questions: [],
    title: '',
    accumulateTime: false,
    livesCount: 0,
    questionTime: 0,
    userId: 0,
    description: '',
    pictureUrl: ''
  };

  openDialog(operation: 'add' | 'edit' | 'delete', question?: Question) {
    let dialogRef;

    switch(operation) {
      case 'add':
        dialogRef = this.dialogService.openAddQuestionDialog();
        break;
      case 'edit':
        dialogRef = this.dialogService.openEditQuestionDialog(question);
        break;
      case 'delete':
        dialogRef = this.dialogService.openDeleteDialog(question);
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        let questions = this.form.get('questions').value;

        // @ts-ignore
        let index = questions.findIndex(x => x === question);

        if(operation === 'add') {
          // @ts-ignore
          questions.push(result);
        } else if(operation === 'edit') {
          // @ts-ignore
          questions[index] = result;
        } else if(operation === 'delete') {
          // @ts-ignore
          questions.splice(index, 1);
        }

        this.form.get('questions').setValue(questions);
      }
    });
  }

  openAddDialog() {
    this.openDialog('add');
  }

  openEditTaskDialog(question: Question) {
    this.openDialog('edit', question);
  }

  openDeleteDialog(question: Question) {
    this.openDialog('delete', question);
  }

  addQuiz() {
    const quiz:Quiz =  this.form.getRawValue() as unknown as Quiz
    this.quizService.add(quiz).subscribe((response: Quiz) => {
      console.log(response)
    },
      (error:Error) => {
      console.error(error)
      });
  }

  onUpload() {
    this.fileUploadService.onUpload(this.selectedFile, "default")
      .subscribe((response: any) => {
        this.form.get('pictureUrl').setValue(response.secure_url);
        console.log(response.secure_url);
      },
        (error:Error) => {
        console.error(error)
        });
  }


  onFileDropped(files: File[]) {
    const file = files[0];
    console.log(file);
    this.prepareFilesList(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.tmpLink = reader.result;
    };
  }

  fileBrowseHandler(event: any) {
    const file = event.target.files[0];
    console.log(file);
    this.prepareFilesList(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.tmpLink = reader.result;
    };

  }

  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  prepareFilesList(file: File) {
    this.selectedFile = file;
    this.file = file;
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }


}
