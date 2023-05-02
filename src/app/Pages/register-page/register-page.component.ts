import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {compareValidator} from "./CompareValidator";
import {User} from "../../models/User";
import * as signalR from '@microsoft/signalr';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  private hubConnection: signalR.HubConnection

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router,) {
  }

  aSub: Subscription;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;


  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Now you have access to log in
      } else if (params['accessDenied']) {
        //fdgdfgdfh
      }
    })
  }


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
  }, {validator: compareValidator})


  onSubmit() {
    this.form.disable();

    if (this.form.invalid) {
      console.log("You do not have access");
      return;
    }

    const user: User = {
      username: this.form.value.email,
      password: this.form.value.password
    }

    this.aSub = this.auth.register(user).subscribe(
      (value) => {
        this.auth.login(user).subscribe(() =>{
          this.router.navigate(['/account'])
        })


        /*
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
        console.log("SUCCESS")
        console.log(value)

         */

      },
      (error) => {
        console.log('ERROR:', error)
        this.form.enable();
      })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
