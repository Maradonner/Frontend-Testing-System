import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {QuizService} from "../../services/quiz.service";
import {Quiz} from "../../models/QuizModel";
import jwtDecode from "jwt-decode";
import {AuthService} from "../../services/auth.service";
import {UserInfo} from "../../models/UserInfo";
import {ActiveTrivia} from "../../models/ActiveTrivia";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";

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
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  public displayedColumns: string[] = ['index', 'id', 'title', 'startTime', 'score', 'operations'];
  public dataSource = new MatTableDataSource<any>;
  users: any[] = [];
  attempts: ActiveTrivia[] = []
  quizzes: Quiz[] = []
  expandedPanel = true;
  selectedTabIndex: number = 0;

  onTabChanged(event: any): void {
    this.selectedTabIndex = event.index;
    this.router.navigate([], {queryParams: {tab: event.index}});
  }

  user: UserInfo = {
    email: '',
    role: '',
    id: 0,
    quizzes: []
  };


  deleteQuiz(quiz:Quiz):void{
    this.quizService.deleteQuiz(quiz.id).subscribe((result)=>{
      console.log(result);
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const tabIndex = params['tab'];
      if (tabIndex !== undefined && tabIndex >= 0 && tabIndex < 3) {
        this.selectedTabIndex = Number(tabIndex);
      }
    });


    this.dataSource = new MatTableDataSource(this.users);

    const jwtToken: any = jwtDecode(this.authService.getToken()) as { [key: string]: any };
    this.user.id = jwtToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
    this.user.role = jwtToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    this.user.email = jwtToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']


    this.quizService.getMyQuizzes().subscribe((result) => {
      this.quizzes = result;
    })

    this.userService.getAllAttempts().subscribe((result: ActiveTrivia[]) => {
      this.attempts = result;
      console.log(this.attempts)
    })
  }


}
