import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  logout(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);

    const payload = {
      access_token: this.accessTokenKey,
      refresh_token: this.refreshTokenKey,
    };

    this.http.post<any>(`${this.apiUrl}/logout`, payload);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<any>(`${this.apiUrl}/login`, body).pipe(
      switchMap((response) => {
        const accessToken = response?.access_token;
        const refreshToken = response?.refresh_token;

        if (accessToken && refreshToken) {
          this.storeTokens(accessToken, refreshToken);
          return of({ success: true });
        } else {
          return of({ error: true, message: 'Login failed.' });
        }
      }),
      catchError((error) => {
        return of({
          error: true,
          message: error?.error?.message || 'Login failed.',
        });
      }),
    );
  }

  getUserName(): string | null {
    const claims = this.getTokenClaims();
    return claims?.name || null;
  }

  getUserRole(): string | null {
    const claims = this.getTokenClaims();
    return claims?.role || null;
  }

  private getTokenClaims(): any {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
