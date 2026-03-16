import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from '../super-admin-layout/super-admin-layout.component';
import { SuperAdminDashboardComponent } from '../super-admin-dashboard/super-admin-dashboard.component';
import { SuperadmincompanyComponent } from './pages/superadmincompany/superadmincompany.component';
import { SuperadmindepartmentComponent } from './pages/superadmindepartment/superadmindepartment.component';
import { SuperadminuserComponent } from './pages/superadminuser/superadminuser.component';

const routes: Routes = [
   {
    path: '',
    component: SuperAdminLayoutComponent,
    children: [

      { path: 'dashboard', component: SuperAdminDashboardComponent },

        { path: 'superadmincompany', component: SuperadmincompanyComponent },
       { path: 'superadmindepartment', component: SuperadmindepartmentComponent },

       { path: 'superadminuser', component: SuperadminuserComponent },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
