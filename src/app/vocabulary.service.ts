import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

interface VocabularyMatch {
  vocabulary: string;
  answer: string;
}

interface VocabularyGameLog {
  userId: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class VocabularyService {
  private apiUrl = 'https://localhost:7298/api/Vocabulary';
  private editId: number | null = null;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  setEditId(id: number): void {
    this.editId = id;
  }

  getEditId(): number | null {
    return this.editId;
  }

  getVocabularyList(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetAllVocabularyList`, { headers: this.getHeaders() });
  }

  addVocabulary(vocabularyMatch: VocabularyMatch): Observable<any> {
    return this.http.post(`${this.apiUrl}/AddNewVocabulary`, vocabularyMatch, { headers: this.getHeaders() });
  }

  getRandomVocabulary(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetRandomVocabulary`, { headers: this.getHeaders() });
  }

  getVocabularyAnswer(answerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetVocabularyAnswer?answerId=${answerId}`, { headers: this.getHeaders() });
  }

  addVocabularyGameLog(userId: string, score: number): Observable<any> {
    const params = new HttpParams().set('userId', userId).set('score', score.toString());
    return this.http.post(`${this.apiUrl}/AddVocabularyGameLog`, null, { headers: this.getHeaders(), params });
  }

  getScoreboard(): Observable<any> {
    return this.http.get(`${this.apiUrl}/GetScoreboard`, { headers: this.getHeaders() });
  }

  updateVocabulary(id: number, vocabulary: string, answer: string): Observable<any> {
    const params = new HttpParams().set('id', id).set('vocabulary', vocabulary.toString()).set('answer', answer.toString());
    return this.http.put(`${this.apiUrl}/UpdateVocabulary`, null, { headers: this.getHeaders(), params});
  }

  getSelectedVocabulary(id: number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/GetSelectedVocabulary?id=${id}`, { headers: this.getHeaders() });
  }

  deleteVocabulary(id: number) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteVocabulary?id=${id}`, { headers: this.getHeaders() });
  }
}
