import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  returnUrl: string;

  error$: BehaviorSubject<string>;
  loading$: BehaviorSubject<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.logout();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.error$ = new BehaviorSubject(null);
    this.loading$ = new BehaviorSubject(false);
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.loading$.next(true);

    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.auth.login(username, password)
    .pipe(first())
    .subscribe(
      success => {
        this.router.navigate([this.returnUrl]);
        this.error$.next(null);
      },
      error => {
        this.error$.next('Incorrect username or password');
        this.loading$.next(false);
        console.error(error);
    });
  }

}
