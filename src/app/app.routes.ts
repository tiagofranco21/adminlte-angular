import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './pages/auth/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeDashboardComponent } from './pages/dashboard/home/home.dashboard.component';
import { BooksListDashboardComponent } from './pages/dashboard/books/books-list/books-list.dashboard.component';
import { BooksAddDashboardComponent } from './pages/dashboard/books/books-add/books-add.dashboard.component';
import { GuestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeDashboardComponent, pathMatch: 'full' },
      {
        path: 'books',
        component: BooksListDashboardComponent,
        pathMatch: 'full',
      },
      {
        path: 'books/add',
        component: BooksAddDashboardComponent,
        pathMatch: 'full',
      },
      { path: 'books/edit/:id', component: BooksAddDashboardComponent },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
