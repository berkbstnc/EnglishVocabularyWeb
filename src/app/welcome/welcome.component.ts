import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  isVisible: boolean = true;
  roleName: string = "";
  userName: string = "";
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (this.authService.getRoleFromToken() === 'Admin') {
      this.roleName = "Admin";
    } else {
      this.isVisible = false;
      this.roleName = "User";
    }

    this.userName = this.authService.getUserName();
  }

  navigateTo(option: string) {
    if (option === 'login')
    {
      localStorage.removeItem('token');
    }
    this.router.navigate([option]);
  }
}