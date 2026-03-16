import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface Submenu {
  title: string;
  route: string;
}

@Component({
  selector: 'app-super-admin-layout',
  standalone: false,
  templateUrl: './super-admin-layout.component.html',
  styleUrl: './super-admin-layout.component.css'
})
export class SuperAdminLayoutComponent {
 collapsed = false;
  selectedSubmenus: Submenu[] = [];
  activeRoute: string = '';
  activeMenu: string = '';
  selectedMenu: string = '';
  showContent: boolean = true;

  menuMap: Record<string, Submenu[]> = {
    'Control Panel': [
      { title: 'Company Management', route: '/superadmin/superadmincompany' },
      { title: 'Department Master', route: '/superadmin/superadmindepartment' }
    ],
    'System & Security': [
      { title: 'User Management', route: '/superadmin/superadminuser' },
    
    ]
  };

  constructor(private router: Router) {}

  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  onMenuSelected(menuName: string) {
    if (menuName === 'Dashboard') {
      this.activeMenu = 'Dashboard';
      this.selectedMenu = 'Dashboard';
      this.selectedSubmenus = [];
      this.activeRoute = '';
      this.showContent = true;
      this.router.navigate(['/superadmin/dashboard']);
      return;
    }

    if (this.selectedMenu === menuName) return;

    this.activeMenu = menuName;
    this.selectedMenu = menuName;
    this.selectedSubmenus = [];
    this.activeRoute = '';
    this.showContent = false; // ✅ hide content area

    setTimeout(() => {
      this.selectedSubmenus = this.menuMap[menuName] || [];
    }, 0);
  }

  onSubmenuSelected(route: string) {
    this.activeRoute = route;
    this.showContent = true; // ✅ show content area
    if (route && route !== '#') {
      this.router.navigate([route]);
    }
  }
}
