import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  isLoading = false;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    const passwordControl = this.fb.control('', [
      Validators.required,
      Validators.minLength(4),
    ]);
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: passwordControl,
    });
  }

  ngOnInit(): void {}

  changeHandler(data: any): void {
    console.log(data);
  }

  submitHandler(): void {
    const data = this.form.value;
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(data).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
      },
    });
  }
}
