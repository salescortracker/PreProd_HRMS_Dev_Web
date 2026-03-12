import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SuperAdminDashboardComponent } from '../../super-admin-dashboard/super-admin-dashboard.component';
import { SuperAdminLayoutComponent } from '../../super-admin-layout/super-admin-layout.component';
import { SuperAdminSidebarComponent } from '../../super-admin-sidebar/super-admin-sidebar.component';
import { SuperAdminTopbarComponent } from '../../super-admin-topbar/super-admin-topbar.component';
import { SuperAdminFooterComponent } from '../../super-admin-footer/super-admin-footer.component';
import { SuperAdminSubmenuComponent } from '../../super-admin-submenu/super-admin-submenu.component';



@NgModule({
  declarations: [
    SuperAdminDashboardComponent,
    SuperAdminLayoutComponent,
    SuperAdminSidebarComponent,
    SuperAdminTopbarComponent,
    SuperAdminFooterComponent,
    SuperAdminSubmenuComponent,
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule
  ],
exports: [
    SuperAdminDashboardComponent,
    SuperAdminLayoutComponent,
    SuperAdminSidebarComponent,
    SuperAdminTopbarComponent,
    SuperAdminFooterComponent,
    SuperAdminSubmenuComponent
  ]
})
export class SuperadminModule { }
