import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  isLoading: boolean = false;
  errorMsg: string = '';
  succesMsg: string = '';
  private readonly userService = inject(UserService)
  updateForm: FormGroup = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }, { validators: [this.confiamrPassword,] })


  // Custom validator to rePassword 
  confiamrPassword(group: any) {
    // 1. password value 
    let newPasswordValue = group.get("newPassword").value

    // 2. newPassword value 
    let confirmPasswordValue = group.get("confirmPassword").value

    // 3. condition 

    if (newPasswordValue === confirmPasswordValue) {
      return null
    } else {
      return { mismatch: true }
    }
  }

  clearInput() {
    this.updateForm.reset();
  }


  update() {
    if (this.updateForm.valid) {
      this.isLoading = true;
      let formValue = this.updateForm.value;
      let body = {
        password: formValue.password,
        newPassword: formValue.newPassword
      }
      this.userService.changePassword(body).subscribe({
        next: (res) => {
          // handel succes massge
          this.errorMsg = '';
          this.succesMsg = res.message

        },
        error: (err) => {
          console.log('this form errr', err);
          this.isLoading = false;
          this.errorMsg = err.error.message
          this.succesMsg = '';
        },
        complete: () => {
          this.isLoading = false;
          this.clearInput();

        }
      })
    }
  }

}


