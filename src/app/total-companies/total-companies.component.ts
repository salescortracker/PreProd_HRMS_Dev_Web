import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AdminService } from '../admin/servies/admin.service';
declare var bootstrap: any;
@Component({
  selector: 'app-total-companies',
  standalone: false,
  templateUrl: './total-companies.component.html',
  styleUrl: './total-companies.component.css'
})
export class TotalCompaniesComponent {
searchText = '';
statusFilter = 'all';
filteredCompanies:any[] = [];
  companies: any[] = [];
  plans: any[] = [];

  selectedCompany: any = {};

  modal: any;

  constructor(private companyService: AdminService, private datePipe: DatePipe
  ) { }

  ngOnInit() {

    this.loadCompanies();
    this.loadPlans();

  }

 loadCompanies(){
this.companyService.getallCompanies()
.subscribe((res:any)=>{

this.companies = res;
this.filteredCompanies = res;

});

}

filterCompanies(){

this.filteredCompanies = this.companies.filter((c:any)=>{

const matchesSearch =
c.companyName.toLowerCase()
.includes(this.searchText.toLowerCase());

let matchesStatus = true;

if(this.statusFilter === 'active')
matchesStatus = c.isActive;

if(this.statusFilter === 'inactive')
matchesStatus = !c.isActive;

if(this.statusFilter === 'expiring')
matchesStatus = this.isExpiringSoon(c.expiryDate);

return matchesSearch && matchesStatus;

});

}

// getUsage(company:any){

// if(!company.plan) return 0;

// return (
// (company.users?.length || 0) /
// company.plan.maxUsers
// ) * 100;

// }

getUsage(company:any){

if(!company.plan || !company.plan.maxUsers)
return 0;

return (
(company.users?.length || 0) /
company.plan.maxUsers
) * 100;

}

isExpiringSoon(expiryDate:any){

const today = new Date();
const expiry = new Date(expiryDate);

const diff =
(expiry.getTime() - today.getTime()) /
(1000*3600*24);

return diff <= 7;

}
getDaysLeft(expiryDate: any): number {

  const today = new Date();
  const expiry = new Date(expiryDate);

  const diff =
    (expiry.getTime() - today.getTime()) /
    (1000 * 60 * 60 * 24);

  return Math.ceil(diff);

}

  loadPlans() {

    this.companyService.getPlanss()
      .subscribe((res: any) => {

        this.plans = res;

      });

  }

  openModal(company: any) {

    this.selectedCompany = { ...company };

     this.selectedCompany.expiryDate =
  this.datePipe.transform(
    company.expiryDate,
    'yyyy-MM-dd'
  );
    

    this.modal = new bootstrap.Modal(
      document.getElementById('companyModal')
    );

    this.modal.show();

  }

  updateCompany() {

    const payload = {
      ...this.selectedCompany,
      expiryDate: new Date(this.selectedCompany.expiryDate)
    };

    this.companyService.updateCompanys(payload)
      .subscribe(() => {

        alert("Company Updated");

        this.modal.hide();

        this.loadCompanies();

      });

  }


}
