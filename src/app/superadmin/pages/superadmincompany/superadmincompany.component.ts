import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { SuperService } from '../../service/super.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Company {
  companyId: number;
  companyName: string;
  companyCode: string;
  industryType: string;
  headquarters: string;
  isActive: boolean;
}

@Component({
  selector: 'app-superadmincompany',
  standalone: false,
  templateUrl: './superadmincompany.component.html',
  styleUrl: './superadmincompany.component.css'
})
export class SuperadmincompanyComponent {
companies: Company[] = [];
searchText = '';

constructor(
  private superService: SuperService,
  private spinner: NgxSpinnerService
) {}

ngOnInit(): void {
  this.loadCompanies();
}

loadCompanies() {

  this.spinner.show();

  this.superService.getCompanies().subscribe({
    next: (res: any) => {

      const data = res.data || [];

      this.companies = data.map((c: any) => ({
        companyId: c.companyId,
        companyName: c.companyName,
        companyCode: c.companyCode,
        industryType: c.industryType,
        headquarters: c.headquarters,
        isActive: c.isActive
      }));

      this.spinner.hide();
    },
    error: () => {
      this.spinner.hide();
      Swal.fire('Error','Failed to load companies','error');
    }
  });
}

filteredCompanies(): Company[] {

  const search = this.searchText?.toLowerCase() || '';

  return this.companies.filter(c =>
    c.companyName?.toLowerCase().includes(search)
  );
}
}
