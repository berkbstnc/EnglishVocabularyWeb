import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent {
  users: any[] = [];
  pagedUsers: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  loading: boolean = false;
  showPopup: boolean = false;
  userId: string = "";
  selectedRoleId: string = '';

  constructor(private userService: UserService, private router: Router) {}
  

  roles: Role[] = [];

  ngOnInit() {
    this.loadUsers();

    this.userService.getAllRoles().subscribe({
      next: (data: any[]) => {
        this.roles = data.map(role => ({
          value: role.roleId,
          viewValue: role.roleName
        }));
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAllUsersList().subscribe({
      next: data => {
        this.users = data;
        this.updatePagedData();
        this.loading = false;
      },
      error: error => {
        console.error('There was an error!', error);
        this.loading = false;
      }
    });
  }

  updatePagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagedData();
  }

  get totalPages(): number[] {
    const total = Math.ceil(this.users.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  navigateTo(option: string) {
    this.router.navigate([option]);
  }

  openPopup(id : string){
    this.userId = id;
    this.showPopup = true;
  }

  closePopup(){
    this.showPopup = false;
  }

  changeRole(roleId: string) {
    this.userService.updateUserRole(this.userId, roleId).subscribe({
      next: response => {
        console.log('Update successful:', response);
        this.closePopup();
        window.location.reload();
      },
      error: error => {
        console.error('Update failed:', error);
        this.closePopup();
        window.location.reload();
      },
      complete: () => {
        console.log('Update request completed.');
        this.closePopup();
        window.location.reload();
      }
    });
  }
}
