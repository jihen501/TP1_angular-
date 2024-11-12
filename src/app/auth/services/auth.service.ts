import { Injectable, inject, signal } from '@angular/core';
import { CredentialsDto } from '../dto/credentials.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { HttpClient } from '@angular/common/http';
import { API } from '../../../config/api.config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);


  private isAuthenticatedSignal = signal(false);
  private userIdSignal = signal<string | null>(null);
  private userEmailSignal = signal<string | null>(null);

  constructor() {
    this.loadUserState(); // Charger l'état de l'utilisateur au démarrage
  }

  login(credentials: CredentialsDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(API.login, credentials);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    this.isAuthenticatedSignal.set(false);
    this.userIdSignal.set(null);
    this.userEmailSignal.set(null);
  }

  // Charger l'état de l'utilisateur depuis le stockage local
   private loadUserState() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');

    if (token && userId && userEmail) {
      this.isAuthenticatedSignal.set(true);
      this.userIdSignal.set(userId);
      this.userEmailSignal.set(userEmail);
    } else {
      this.isAuthenticatedSignal.set(false);
    }
  }

  get isAuthenticated() {
    return this.isAuthenticatedSignal;
  }

  get userId() {
    return this.userIdSignal;
  }

  get userEmail() {
    return this.userEmailSignal;
  }

  setUserState(response: LoginResponseDto, credentials: CredentialsDto) {
    localStorage.setItem('token', response.id);
    localStorage.setItem('userId', response.userId.toString());
    localStorage.setItem('userEmail', credentials.email);
    this.isAuthenticatedSignal.set(true);
    this.userIdSignal.set(response.userId.toString());
    this.userEmailSignal.set(credentials.email);
  }
}
