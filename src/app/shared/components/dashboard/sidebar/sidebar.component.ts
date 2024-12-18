import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../../pipes/translate.pipe';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {}
