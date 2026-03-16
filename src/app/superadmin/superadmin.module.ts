import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { SuperadmincompanyComponent } from './pages/superadmincompany/superadmincompany.component';
import { FormsModule } from '@angular/forms';
import { SuperadmindepartmentComponent } from './pages/superadmindepartment/superadmindepartment.component';
import { SuperadminuserComponent } from './pages/superadminuser/superadminuser.component';



@NgModule({
  declarations: [
    SuperadmincompanyComponent,
    SuperadmindepartmentComponent,
    SuperadminuserComponent,
   
  ],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    FormsModule
  ]
})
export class SuperadminModule { }
