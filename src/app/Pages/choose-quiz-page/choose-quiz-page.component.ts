import {Component, OnDestroy, OnInit} from '@angular/core';
import {QuizService} from "../../services/quiz.service";
import {Router} from "@angular/router";
import {Quiz} from "../../models/QuizModel";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-choose-quiz-page',
  templateUrl: './choose-quiz-page.component.html',
  styleUrls: ['./choose-quiz-page.component.css']
})
export class ChooseQuizPageComponent implements OnInit, OnDestroy {
  quizzes: Quiz[] = [];
  data = [];
  subScroll$: Subscription;
  page = 1;
  totalPages: number = 0;


  constructor(private quizService: QuizService,
              private router: Router) {
  }

  getQuizImageUrl(pictureUrl: string): string {
    const parts = pictureUrl.split('/');
    return parts[6] + '/' + parts[7];
  }



  async ngOnInit() {
    this.quizService.displayAll().subscribe((quizzes) => {
      this.quizzes = quizzes;
    })
    /*
    this.totalPages = await lastValueFrom(this.quizService.getTotalPages())
    this.loadMore();
     */
  }


  startQuiz(quiz: Quiz) {
    this.router.navigate(['quiz/start'], {queryParams: {id: quiz.id}})
  }


  ngOnDestroy(): void {
      this.subScroll$?.unsubscribe();
  }
}


/*
loadMore() {
  console.log(this.page, this.totalPages)
  if(this.page >= this.totalPages){
    this.subScroll$.unsubscribe()
    return;
  }
  this.quizService.getPageNumber(this.page).subscribe((data: Quiz[]) => {
    this.quizzes = this.quizzes.concat(data);
    this.page++;
  });
}
 */


/*
ngAfterViewInit() {
  const content = document.querySelector('.mat-sidenav-content');
  this.subScroll$ = fromEvent(content, 'scroll')
    .pipe(debounceTime(100),
      map((event: any) => {
        let tracker = event.target;
        let endReached = false;
        let limit = tracker.scrollHeight - tracker.clientHeight;

        console.log(event.target.scrollTop, limit);

        if (event.target.scrollTop > limit - 600) {
          console.log("ENDED")
          this.loadMore();
          endReached = true;
        }

      })).subscribe()
}
 */


/*
 @HostListener('scroll', ['$event'])
 onScroll(event) {
   console.log("TRRRRURR")
   let tracker = event.target;
   let endReached = false;
   let limit = tracker.scrollHeight - tracker.clientHeight;

   console.log(event.target.scrollTop, limit);
   if (event.target.scrollTop === limit) {
     console.log("ENDED")
     endReached = true;
   }
 }


 @HostListener('window:scroll', ['$event'])
 onWindowScroll(event) {
   console.log("Huk")
   const container = event.target.querySelector('#container');
   const {scrollTop, clientHeight, scrollHeight} = container;

   if (scrollTop + clientHeight >= scrollHeight) {
     console.log("TOPIL")
     // End of container reached, time to load more items
   }
 }
  */
