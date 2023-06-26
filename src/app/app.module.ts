import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RouterModule, Routes} from "@angular/router";
import {CreateQuestionDialogComponent} from './Dialogs/create-question-dialog/create-question-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DeleteDialogComponent} from './Dialogs/delete-dialog/delete-dialog.component';
import {MainPageComponent} from "./Pages/main-page/main-page.component";
import {LoginPageComponent} from "./Pages/login-page/login-page.component";
import {RegisterPageComponent} from "./Pages/register-page/register-page.component";
import {AuthGuard} from "./Layouts/auth.guard";
import {TokenInterceptor} from "./Layouts/token.interceptor";
import {AdminPageComponent} from './Pages/admin-page/admin-page.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {CreateQuizComponent} from "./Pages/create-quiz/create-quiz.component";
import {CreateQuizPageComponent} from "./Pages/create-quiz-page/create-quiz-page.component";
import {DialogBoxComponent} from "./Dialogs/dialog-box/dialog-box.component";
import {NgOptimizedImage, provideCloudinaryLoader} from "@angular/common";
import {DndDirective} from './Layouts/dnd.directive';
import {MouseDirective} from './Layouts/mouse.directive';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ChooseQuizPageComponent} from "./Pages/choose-quiz-page/choose-quiz-page.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {SnackBarComponent} from "./Layouts/snack-bar/snack-bar.component";
import {MatListModule} from "@angular/material/list";
import {UpdateQuizPageComponent} from "./Pages/update-quiz-page/update-quiz.component";
import {MatMenuModule} from "@angular/material/menu";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {UserProfilePageComponent} from "./Pages/user-profile-page/user-profile-page.component";
import {CreateExamPageComponent} from "./Pages/create-exam-page/create-exam-page.component";
import {MatRadioModule} from "@angular/material/radio";
import {FinalDialogComponent} from "./Dialogs/final-dialog/final-dialog.component";
import {PlayQuizComponent} from "./Pages/PlayQuiz/PlayQuiz.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {GlobalErrorHandlerService} from "./services/global-error-handler.service";
import {MatTabsModule} from "@angular/material/tabs";
import {ChoosePageComponent} from "./Pages/choose-page/choose-page.component";
import {CreateCoursePageComponent} from "./Pages/create-course-page/create-course-page.component";
import {MatChipsModule} from "@angular/material/chips";
import {MatBadgeModule} from "@angular/material/badge";
import {UpdatePageComponent} from "./Pages/update-page/update-page.component";
import {CreatePageComponent} from "./Pages/create-page/create-page.component";

const appRoutes: Routes = [

  {path: 'register', component: RegisterPageComponent,},
  {path: 'login', component: LoginPageComponent,},
  {path: 'logout', component: UpdateQuizPageComponent,},
  {path: 'account', component: UserProfilePageComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]},
  {path: 'quiz/start', component: MainPageComponent,},
  {path: 'choose', component: ChoosePageComponent,},
  {path: 'choose/quiz', component: ChooseQuizPageComponent,},
  {path: 'update', component: UpdatePageComponent, canActivate: [AuthGuard]},
  {path: 'update/quiz', component: UpdateQuizPageComponent, canActivate: [AuthGuard]},
  {path: 'create', component: CreatePageComponent,},
  {path: 'create/quiz', component: CreateQuizComponent, canActivate: [AuthGuard]},
  {path: 'create/exam', component: CreateExamPageComponent, canActivate: [AuthGuard]},
  {path: 'create/course', component: CreateCoursePageComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    AppComponent,
    DialogBoxComponent,
    MainPageComponent,
    CreateQuestionDialogComponent,
    DeleteDialogComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AdminPageComponent,
    CreateQuizComponent,
    CreateQuizPageComponent,
    DndDirective,
    MouseDirective,
    ChooseQuizPageComponent,
    SnackBarComponent,
    UpdateQuizPageComponent,
    UserProfilePageComponent,
    CreateExamPageComponent,
    FinalDialogComponent,
    PlayQuizComponent,
    ChoosePageComponent,
    CreateCoursePageComponent,
    UpdatePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'}),
    MatFormFieldModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    NgOptimizedImage,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatListModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSidenavModule,
    MatToolbarModule,
    DragDropModule,
    MatTabsModule,
    MatChipsModule,
    MatBadgeModule,
  ],

  providers: [
    provideCloudinaryLoader('https://res.cloudinary.com/dwa1jwp8z/'),
    {provide: 'BASE_URL', useFactory: () => "https://vhdk4wclsm2oamga6ynnstpvva0pzeyi.lambda-url.eu-north-1.on.aws/", deps: []},
    //{provide: 'BASE_URL', useFactory: () => "https://localhost:7131", deps: []},
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor},
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
  ],

  entryComponents: [
    DialogBoxComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
