import { Component } from '@angular/core';
import { AdminService } from '../admin/servies/admin.service';

@Component({
  selector: 'app-company-listing',
  standalone: false,
  templateUrl: './company-listing.component.html',
  styleUrl: './company-listing.component.css'
})
export class CompanyListingComponent {
 companies: any[] = [];
  filteredCompanies: any[] = [];

  searchText: string = '';

  constructor(private companyService: AdminService) {}

  ngOnInit(): void {
    this.loadCompanies();

  }

  loadCompanies() {

    this.companyService.getallCompanies()
      .subscribe((res: any) => {

        this.companies = res;
        this.filteredCompanies = res;

      });

  }

 toggleStatus(company: any) {

  if (!confirm("Are you sure you want to change company status?"))
    return;
debugger;
  this.companyService.toggleCompany(company.companyId)
    .subscribe(() => {

      company.isActive = !company.isActive;

    });

}

  searchCompany() {

    if (!this.searchText) {

      this.filteredCompanies = this.companies;
      return;

    }

    this.filteredCompanies = this.companies.filter(x =>
      x.companyName.toLowerCase()
        .includes(this.searchText.toLowerCase())
    );

  }

  // toggleStatus(company: any) {

  //   const data = {
  //     companyId: company.companyId,
  //     isActive: !company.isActive
  //   };

  //   this.companyService.updateCompanyStatus(data)
  //     .subscribe(() => {

  //       company.isActive = !company.isActive;

  //     });

  // }


}
