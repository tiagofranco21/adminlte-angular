import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../../../../core/services/translate.service';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, CapitalizePipe],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() userName = 'User';
  currentLanguage = 'English';
  languages: string[] = ['English', 'Portuguese'];

  constructor(
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
  ) {
    this.translateService.getCurrentLang().subscribe((lang) => {
      this.currentLanguage = lang;
    });
  }

  changeLanguage(lang: string): void {
    this.translateService.use(lang);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
