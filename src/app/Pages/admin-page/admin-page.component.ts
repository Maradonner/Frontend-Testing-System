import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AdminService} from "../../services/admin.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {UserInfo} from "../../models/UserInfo";
import {Quiz} from "../../models/QuizModel";
import jwtDecode from "jwt-decode";
import {AuthService} from "../../services/auth.service";
import {MatSort} from "@angular/material/sort";
import {catchError, map, merge, of, startWith, switchMap} from "rxjs";


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class AdminPageComponent implements OnInit, AfterViewInit {

  columnsToDisplay = ['id', 'username', 'role', 'quizzes', 'operations'];
  specialToDisplay = ['id', 'username', 'role', 'quizzes'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay];
  expandedElement: UserInfo | null;

  constructor(private adminService: AdminService) {
  }

  users: UserInfo[] = [];
  public displayedColumns: string[] = ['index', 'id', 'username', 'role', 'quizzes', 'operations'];
  public dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.adminService.getUsersSort(this.sort.active, this.sort.direction, this.paginator.pageIndex)
            .pipe(catchError(() => of(null)));
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.length;
          return data;
        }),
      )
      .subscribe(data => (this.users = data));
  }


  ngOnInit(): void {
    this.adminService.getUsers().subscribe((response: UserInfo[]) => {
      this.users = response
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    })
  }

  openEditTaskDialog(quiz: Quiz) {
    console.log(quiz)
  }

  openDeleteDialog(quiz: Quiz) {
    console.log(quiz)
  }

  updateUser() {
    this.adminService.getUsers().subscribe((response: UserInfo[]) => {
      this.users = response
      console.log(response)
    })
  }

  toggleExpansion() {
    console.log("YYYYYY")
  }

  searchValue = '';

  applyFilter(filterValue: any) {
    console.log(filterValue)
    this.searchValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.searchValue;
  }

  clearSearch() {
    this.searchValue = '';
    this.dataSource.filter = this.searchValue;
  }
}
