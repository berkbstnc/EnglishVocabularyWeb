import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7298/api/Authenticate';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  private get token(): string | null {
    return localStorage.getItem('token');
  }

  login(credentials: { username: string, password: string }) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials).pipe(
        tap(response => {
            localStorage.setItem('token', response.token);
        })
    );
  }

  register(credentials: { username: string, email: string, password: string}){
    return this.http.post(`${this.baseUrl}/register`, credentials);
  }

  isLoggedIn(){
    if (this.token !== null && !this.jwtHelper.isTokenExpired(this.token)){
      return true;
    }
    else{
      if (this.token !== null)
      {
        localStorage.clear();
      }
      return false;
    }
  }

  getRoleFromToken(): string | null {
    if (this.token) {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      return decodedToken['Role'];
    }
    return null;
  }

  getUserRole(): string | null {
    if (this.token) {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      return decodedToken.Role; 
    }
    return null;
  }

  getUserIdromToken(): string {
    if (this.token) {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      return decodedToken['UserId'];
    }
    return "Not Found";
  }

  getUserName(): string {
    if (this.token) {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      return decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    }
    return "Not Found";
  }

  sendResetPasswordMail(userName: string): Observable<any> {
    const params = new HttpParams().set('userName', userName);
    return this.http.post(`${this.baseUrl}/send-resetmail`, null, { params });
}

  changePasswordByResetToken(username: string, token: string, newPassword: string): Observable<any> {
    const params = new HttpParams().set('username', username).set('token', token).set('newpassword', newPassword);
    return this.http.post(`${this.baseUrl}/resetpasswordbyresettoken`, null, { params});
  }

  changePasswordByUser(username: string, newPassword: string): Observable<any> {
    const params = new HttpParams().set('username', username).set('newpassword', newPassword);
    return this.http.post(`${this.baseUrl}/resetpasswordbyuser`, null, { params});
  }
}