import { Component } from '@angular/core';
import { AdminService } from '../admin/servies/admin.service';

@Component({
  selector: 'app-create-company',
  standalone: false,
  templateUrl: './create-company.component.html',
  styleUrl: './create-company.component.css'
})
export class CreateCompanyComponent {
 company: any = {
    companyName: '',
    companyEmail: '',
    planId: null,
    expiryDate: ''
  };

  plans: any[] = [];

  constructor(private superAdminService: AdminService) {}

  ngOnInit(): void {
    this.loadPlans();
  }

  loadPlans() {
    this.superAdminService.getPlanss()
      .subscribe((res: any) => {
        this.plans = res;
      });
  }

  saveCompany() {

    this.superAdminService.createCompanys(this.company)
      .subscribe({
        next: (res: any) => {

          alert("Company Created Successfully");

          console.log(res);

        },
        error: (err) => {

          alert(err.error?.message || "Something went wrong");

        }
      });

  }
}
