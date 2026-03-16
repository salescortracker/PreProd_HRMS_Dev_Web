import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-topbar',
  standalone: false,
  templateUrl: './super-admin-topbar.component.html',
  styleUrl: './super-admin-topbar.component.css'
})
export class SuperAdminTopbarComponent {
 @Output() toggleSidebar = new EventEmitter<void>();

  userName: string = 'Super Admin';

  constructor(private router: Router) {}

  logout() {

    // Optional: clear session or token
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login page
    this.router.navigate(['/']);

  }


}
