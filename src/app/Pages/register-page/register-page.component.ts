import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
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
  private hubConnection: signalR.HubConnection;
  aSub: Subscription;
  hidePassword = true;
  hideConfirmPassword = true;
  submitting = false;

  form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
      error: new FormControl(''),
    },
    {validator: compareValidator}
  );

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        // Now you have access to log in
      } else if (params['accessDenied']) {
        // Access denied message
      }
    });
  }

  onSubmit(): void {
    this.form.disable();
    this.submitting = true;

    if (this.form.invalid) {
      this.form.get('error')?.setValue('Invalid Data');
      return;
    }

    const user: User = {
      username: this.form.value.email,
      password: this.form.value.password,
    };

    this.aSub = this.auth.register(user).subscribe(
      () => {
        this.auth.login(user).subscribe(() => {
          this.router.navigate(['/account']);
        });
      },
      (error) => {
        console.log('ERROR:', error);
        this.form.enable();
      }
    );
  }

  ngOnDestroy(): void {
    this.aSub?.unsubscribe();
  }

}
