import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  private readonly formBuilder = inject(FormBuilder)
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)


  timeOutId: any;
  successMsg: string = '';
  errorMsg: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]]
  })


  /** Resets all form fields to their initial state */
  clearInput() {
    this.loginForm.reset();
  }


  signIn() {
    if (this.loginForm.valid) {
      // show Loading 
      this.isLoading = true;
      this.authService.singIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {

            // hide error massge 
            this.errorMsg = '';
            // show succes massge
            this.successMsg = res.message

            // creat the token in localStorage
            localStorage.setItem("token", res.data.token)
          }

        },
        error: (err) => {
          console.log(err);

          // hide succes massge
          this.successMsg = '';
          // show erro massge
          this.errorMsg = err.error.message;

          // hidde is loading
          this.isLoading = false

        },
        complete: () => {
          // hidde is loading
          this.isLoading = false
          // if success navigate to home 
          this.navigateToHome();
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }


  // navigate to home 
  navigateToHome() {
    this.timeOutId = setTimeout(() => {
      this.router.navigate(['/home']);
    }, 300);
  }


  ngOnDestroy(): void {
    // clear the input in form 
    this.clearInput();
    // stop the setTimeOut
    clearTimeout(this.timeOutId)
  }

}
