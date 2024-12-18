import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="main-footer">
      <strong
        >Copyright &copy; 2024
        <a href="https://adminlte.io">AdminLTE.io</a>.</strong
      >
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.2.0
      </div>
    </footer>
  `,
  styles: [],
})
export class FooterComponent {}
