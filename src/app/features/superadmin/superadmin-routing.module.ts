import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminDashboardComponent } from '../../super-admin-dashboard/super-admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from '../../super-admin-layout/super-admin-layout.component';

const routes: Routes = [
  {
    path: 'superadmin',
    component: SuperAdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: SuperAdminDashboardComponent },
    ]
  }
  // You can add more child routes here later
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
