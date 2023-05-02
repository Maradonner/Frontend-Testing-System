import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";
import {CdkScrollable} from "@angular/cdk/overlay";
import {MatSidenavContainer} from "@angular/material/sidenav";


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTES: RouteInfo[] = [
  //{path: 'login', title: 'Login', icon: 'login', class: ''},
  {path: 'admin', title: 'Admin', icon: 'badge', class: ''},
  {path: 'account', title: 'My Account', icon: 'account_box', class: ''},
  //{path: 'create/quiz', title: 'Create', icon: 'edit', class: ''},
  //{path: 'update/quiz', title: 'Quiz', icon: 'quiz', class: ''},
  {path: 'update', title: 'Update', icon: 'update', class: ''},
  {path: 'choose', title: 'Category', icon: 'quiz', class: ''},
  //{path: 'choose/quiz', title: 'QUIZ Choose', icon: 'quiz', class: ''},
  //{path: 'create/exam', title: 'Exam', icon: 'quiz', class: ''},
  {path: 'logout', title: 'Logout', icon: 'logout', class: 'active-pro'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  @ViewChild(MatSidenavContainer) sidenavContainer: MatSidenavContainer;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;

  public menuItems: any[];
  path: string[];

  logOut(): void {
    this.auth.logout();
    this.router.navigate(['/login'], {
      queryParams: {
        registered: false
      }
    })
    this.menuItems = ROUTES.filter(menuItem => menuItem.path !== '/logout');
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary')
      )
      .subscribe(route => {
        this.path = route.snapshot.url.map(segment => segment.path);
      });

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      if (event.url === '/logout') {
        this.logOut();
      }
    });

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    const potentialToken = localStorage.getItem('auth-token')
    const potentialRefreshToken = localStorage.getItem('refreshToken')
    if (potentialToken !== null) {
      this.auth.setToken(potentialToken);
    }
    if (potentialRefreshToken !== null) {
      this.auth.setRefreshToken(potentialRefreshToken);
    }

  }

  /*
  ngAfterViewInit() {
    console.log(this.sidenavContainer)
    console.log('ngOnInit: sidenavContainer', this.sidenavContainer.hasBackdrop);
    // this.sidenavContainer.scrollable.elementScrolled().subscribe(() => {
    //   console.log('sidenavContainer is scrolled.');
    // });
    this.scrollable.elementScrolled().subscribe((event:any) => {
      console.log("TRRRRURR")
      let tracker = event.target;
      let endReached = false;
      let limit = tracker.scrollHeight - tracker.clientHeight;

      console.log(event.target.scrollTop, limit);
      if (event.target.scrollTop === limit) {
        console.log("ENDED")
        endReached = true;
      }
    })
  }
   */

}
