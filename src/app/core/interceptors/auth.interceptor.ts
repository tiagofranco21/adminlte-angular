import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<any> => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  let authReq = req;
  if (accessToken) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && authService.isLoggedIn()) {
        const refreshToken = authService.getRefreshToken();

        if (!refreshToken) {
          authService.logout();
          return throwError(() => error);
        }

        return from(
          fetch(`${environment.apiUrl}/auth/refresh`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
            body: JSON.stringify({}),
          }).then((response) => {
            if (!response.ok) {
              throw new Error('Failed to refresh token.');
            }
            return response.json();
          }),
        ).pipe(
          switchMap((data: any) => {
            const newAccessToken = data?.access_token;

            if (newAccessToken) {
              authService.storeTokens(newAccessToken, refreshToken);

              const clonedRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });
              return next(clonedRequest);
            } else {
              authService.logout();
              return throwError(
                () => new Error('No new access token received.'),
              );
            }
          }),
          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
