import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/QuizModel";
import jwtDecode from "jwt-decode";
import {AuthService} from "../../services/auth.service";
import {UserInfo} from "../../models/UserInfo";
import {ActiveTrivia} from "../../models/ActiveTrivia";
import {MatTableDataSource} from "@angular/material/table";

interface User {
  username: string;
  email: string;
  passedQuizzes: string[];
}

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {

  constructor(private userService: UserService,
              private quizService: QuizService,
              private authService: AuthService,) {
  }

  public displayedColumns: string[] = ['index', 'id', 'title', 'startTime', 'score', 'operations'];
  public dataSource = new MatTableDataSource<any>;
  users: any[] = [];
  attempts: ActiveTrivia[] = []
  quizzes: Quiz[] = []

  user: UserInfo = {
    username: '',
    role: '',
    id: 0,
    quizzes: []
  };

  expandedPanel = true;

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.users);


    const jwtToken: any = jwtDecode(this.authService.getToken()) as { [key: string]: any };
    this.user.id = jwtToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    this.user.role = jwtToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    this.user.username = jwtToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']


    this.quizService.getMyQuizzes().subscribe((result) => {
      this.quizzes = result;
    })

    this.userService.getAllAttempts().subscribe((result: ActiveTrivia[]) => {
      this.attempts = result;
      console.log(this.attempts)
    })


    /*
    this.userService.getInfo().subscribe((result: any) => {
      this.user = result;
    })
     */

  }

  tests = [
    {
      title: 'Test 1',
      description: 'This is a sample test 1.'
    },
    {
      title: 'Test 2',
      description: 'This is a sample test 2.'
    }
  ];



}
