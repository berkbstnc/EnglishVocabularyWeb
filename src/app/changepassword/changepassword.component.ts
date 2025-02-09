import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-changepassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './changepassword.component.html',
  styleUrl: './changepassword.component.css'
})
export class ChangepasswordComponent {

  loading = false;
  changePasswordForm : FormGroup;
  errorMessage: string | null = null;
  submitted = false;
  token: string | null = null;
  username: string | null = null;
  isAuthUser: boolean = false;
  isVisible: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.username = this.route.snapshot.queryParamMap.get('username');
    if (this.authService.isLoggedIn())
    {
      this.isAuthUser = true;
      this.isVisible = true;
    }

    if (!this.isAuthUser)
    {
      if (!this.token || !this.username ) {
        this.navigateTo('login')
      }
    }

  }

  navigateTo(option: string) {
    this.router.navigate([option]);
  }

  onSubmit() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    if (!this.isAuthUser)
      {
        if (this.token !== null && this.username !== null ) {
          this.authService.changePasswordByResetToken(this.username, this.token, this.changePasswordForm.get('password')?.value).subscribe({
            next: response => {
              this.navigateTo("login");
            },
            error: error => {
              alert("The password reset link has been expired!");
              this.navigateTo("login");
            }
          });
        }
      }
      else{

        this.username = this.authService.getUserName();

        this.authService.changePasswordByUser(this.username, this.changePasswordForm.get('password')?.value).subscribe({
          next: response => {
            this.navigateTo("welcome");
          },
          error: error => {
            alert("You have entered wrong/invalid password. Please try again.");
            this.navigateTo("changepassword");
          }
        });

      }

  }

}
