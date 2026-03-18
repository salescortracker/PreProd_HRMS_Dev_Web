import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminDashboardComponent } from '../../super-admin-dashboard/super-admin-dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminLayoutComponent } from '../../super-admin-layout/super-admin-layout.component';
import { CreateCompanyComponent } from '../../create-company/create-company.component';
import { PlanComponent } from '../../plan/plan.component';
import { AssignmodulesComponent } from '../../assignmodules/assignmodules.component';
import { CompanyListingComponent } from '../../company-listing/company-listing.component';
import { TotalCompaniesComponent } from '../../total-companies/total-companies.component';

const routes: Routes = [
  {
    path: 'superadmin',
    component: SuperAdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      { path: 'dashboard', component: SuperAdminDashboardComponent },
      { path: 'create-company', component: CreateCompanyComponent },
      {path: 'subscription-plans', component: PlanComponent},
      { path: 'assign-modules/:planId', component: AssignmodulesComponent },
        // {path: 'assign-modules', component: PlanComponent}
        {path: 'assign-modules', component: PlanComponent}, // Temporary route for testing
        {path : 'company-list', component: CompanyListingComponent}, // Temporary route for testing
        {path : 'company-listing', component: TotalCompaniesComponent} // Temporary route for testing
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
