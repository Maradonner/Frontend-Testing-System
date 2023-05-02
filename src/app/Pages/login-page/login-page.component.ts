import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {User} from "../../models/User";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy {
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  submitting: boolean = false;
  aSub: Subscription;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    error: new FormControl('')
  })


  onSubmit() {
    this.submitting = true;
    this.form.disable();

    if (this.form.invalid) {
      this.form.get('error')?.setValue('Invalid Data')
      return;
    }

    const user: User = {
      username: this.form.value.email,
      password: this.form.value.password
    }

    this.aSub = this.auth.login(user).subscribe(
      (value) => {
        this.router.navigate(['/account'])
      },
      (error) => {
        console.log(error?.error)
        this.form.get('error')?.setValue(error?.error)
        this.form.enable();
      })
    this.submitting = false;
  }

  ngOnDestroy(): void {
    this.aSub?.unsubscribe();
  }

}
