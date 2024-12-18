import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/dashboard/header/header.component';
import { FooterComponent } from '../../shared/components/dashboard/footer/footer.component';
import { SidebarComponent } from '../../shared/components/dashboard/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  userName = 'User';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName() || 'User';
    document.body.classList.remove('login-page');
  }
}
