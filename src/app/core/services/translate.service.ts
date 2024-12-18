import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private data: Record<string, string> = {};
  private currentLang = new BehaviorSubject<string>('');
  private listKeys: any = {};

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('language') || 'english';
    this.use(savedLang);
  }

  use(lang: string): Promise<Record<string, string>> {
    lang = lang.toLowerCase();
    return new Promise((resolve) => {
      const langPath = `i18n/${lang || 'english'}.json`;
      this.http
        .get<Record<string, string>>(langPath)
        .pipe(
          catchError(() => {
            console.error(
              `Error loading translation file for language: ${lang}`,
            );
            return of({});
          }),
        )
        .subscribe((translation) => {
          this.data = Object.assign({}, translation || {});
          this.currentLang.next(lang);
          localStorage.setItem('language', lang);
          resolve(this.data);
        });
    });
  }

  getCurrentLang(): Observable<string> {
    return this.currentLang.asObservable();
  }

  getTranslate(key: string): string {
    return this.data[key] || key;
  }
}
