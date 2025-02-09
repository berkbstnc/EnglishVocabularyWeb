import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7298/api/User';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  getAllUsersList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllUsersList`);
  }

  getAllRoles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllRoles`);
  }

  updateUserRole(userId: string, roleId: string): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('roleId', roleId);
    return this.http.put(`${this.apiUrl}/UpdateUserRole`, null, {params});
  }
}
