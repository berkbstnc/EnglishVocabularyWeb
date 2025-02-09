import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  loading = false;
  resetPasswordForm : FormGroup;
  errorMessage: string | null = null;
  messageColor: string = 'red'; 
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.resetPasswordForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  navigateTo(option: string) {
    this.router.navigate([option]);
  }

  onSubmit() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.authService.sendResetPasswordMail(this.resetPasswordForm.get('username')?.value).subscribe({
      next: response => {
        console.log('API response:', response);
        this.messageColor = "green";
        this.errorMessage = "Doğrulama maili kayıtlı mail adresine gönderilmiştir."
      },
      error: error => {
        console.error('API error:', error);
        this.errorMessage = 'Sistemde tanımlı kullanıcı bulunamadı'
      }
    });

  }

}
