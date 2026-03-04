import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router)
  timeOutId: any;
  successMsg: string = '';
  errorMsg: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    username: new FormControl(null),
    email: new FormControl(null, [Validators.required, Validators.email]),
    dateOfBirth: new FormControl(null, [Validators.required]),
    gender: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)]),
    rePassword: new FormControl(null, [Validators.required]),
  }, { validators: [this.confiamrPassword,] })


  /** Resets all form fields to their initial state */
  clearInput() {
    this.registerForm.reset();
  }


  singUp() {
    if (this.registerForm.valid) {
      // showa is loading 
      this.isLoading = true;
      console.log(this.registerForm.value);
      this.authService.singUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {

            // handel succes massge
            this.errorMsg = '';
            this.successMsg = res.message

            // clear Input 
            this.clearInput();



          }
        }, error: (err) => {
          console.log(err);

          // handel erro massge
          this.successMsg = ''
          this.errorMsg = err.error.message

          // hidde is loading
          this.isLoading = false
        },
        complete: () => {
          // hidde is loading
          this.isLoading = false
          // if success navigate to login
          this.navigateToLogin()

        }
      })
    } else {
      this.registerForm.markAllAsTouched();
    }

  }


  // navigate to lgoin 
  navigateToLogin() {
    this.timeOutId = setTimeout(() => {
      this.router.navigate(['/login']);
    }, 300);
  }

  // Custom validator to rePassword 
  confiamrPassword(group: any) {
    // 1. password value 
    let passwordValue = group.get("password").value

    // 2. rePassword value 
    let rePasswordValue = group.get("rePassword").value

    // 3. condition 

    if (passwordValue === rePasswordValue) {
      return null
    } else {
      return { mismatch: true }
    }
  }



  ngOnDestroy(): void {
    this.clearInput();
    clearTimeout(this.timeOutId);
  }
}
