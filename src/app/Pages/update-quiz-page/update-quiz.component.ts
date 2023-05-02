import {Component, Input, OnInit} from '@angular/core';
import {QuizService} from "../../services/quiz.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../../models/QuizModel";
import {QuestionService} from "../../services/question.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {SnackBarMessageService} from "../../services/snack-bar-message-service";
import {DialogService} from "../../services/dialog.service";
import {FileUploadService} from "../../services/file-upload.service";
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-update-quiz-page',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizPageComponent implements OnInit {
  constructor(private service: QuestionService,
              private dialog: MatDialog,
              private http: HttpClient,
              private snackBarMessageService: SnackBarMessageService,
              private dialogService: DialogService,
              private fileUploadService: FileUploadService,
              private fb: FormBuilder,
              private quizService: QuizService,
              private route: ActivatedRoute) {
  }

  quizId: number;
  quiz: Quiz;

  ngOnInit(): void {
    /*
    const quiz: Quiz = {
      id: 1111,
      questions: [],
      title: 'TTTTTTAAAAAAAAAATTTTTTTTTAAAAAAAAAAAATTTTTTTTTTAAAAAAAAAATTTTTTTTT',
      accumulateTime: 222,
      livesCount: 2222222,
      questionTime: 2222,
      userId: 3333,
      description: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      pictureUrl: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    };
    this.quiz = quiz;
     */

    this.route.queryParams.subscribe(params => {
      this.quizId = params['id'];
    });

    this.quizService.getById(this.quizId).subscribe((quiz: Quiz) => {
      this.quiz = quiz;
      console.log(quiz);
    });
  }


}
