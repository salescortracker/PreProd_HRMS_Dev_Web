import { Component } from '@angular/core';
import { AdminService, Company, Region } from '../admin/servies/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

export interface AccountType {
  accountTypeId: number;
  companyId: number;
  regionId: number;
  accountType1: string;
  description?: string;
  isActive: boolean;
  userId?: number;
}


@Component({
  selector: 'app-account-type',
  standalone: false,
  templateUrl: './account-type.component.html',
  styleUrl: './account-type.component.css'
})
export class AccountTypeComponent {
  searchText = '';

  accountTypes: AccountType[] = [];
  account!: AccountType;

  companies: Company[] = [];
  regions: Region[] = [];

  companyMap: Record<number, string> = {};
  regionMap: Record<number, string> = {};

  userId!: number;
  companyId!: number;
  regionId!: number;

  isEditMode = false;

  constructor(
    private adminService: AdminService,
    private spinner: NgxSpinnerService
  ) {}

 ngOnInit(): void {

  this.userId = Number(sessionStorage.getItem("UserId")) || 0;
  this.companyId = Number(sessionStorage.getItem("CompanyId")) || 0;
  this.regionId = Number(sessionStorage.getItem("RegionId")) || 0;

  this.account = {
    accountTypeId: 0,
    companyId: this.companyId,
    regionId: this.regionId,
    accountType1: '',
    description: '',
    isActive: true
  };

  this.loadCompanies();
  this.loadAccountTypes();
}

  loadAccountTypes() {

    this.spinner.show();

    this.adminService.getAccountTypes(this.userId).subscribe({
      next: (res: any) => {

        const data = res.data || [];

        this.accountTypes = data.map((x: any) => ({
          accountTypeId: x.accountTypeId,
          accountType1: x.accountType1,
          description: x.description,
          isActive: x.isActive,
          companyId: x.companyId,
          regionId: x.regionId
        }));

        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
        Swal.fire('Error','Failed to load account types','error');
      }
    });
  }

  onSubmit() {

    this.account.companyId = this.companyId;
    this.account.regionId = this.regionId;
    this.account.userId = this.userId;

    this.spinner.show();

    const obs = this.isEditMode
      ? this.adminService.updateAccountType(this.account)
      : this.adminService.createAccountType(this.account);

    obs.subscribe({
      next: () => {

        this.spinner.hide();

        Swal.fire(
          this.isEditMode ? 'Updated!' : 'Added!',
          `Account Type ${this.isEditMode ? 'updated' : 'created'} successfully.`,
          'success'
        );

        this.loadAccountTypes();
        this.clearForm();
      },
      error: () => {
        this.spinner.hide();
        Swal.fire('Error','Operation failed','error');
      }
    });
  }

  editAccount(a: AccountType) {

    this.account = { ...a };

    this.companyId = a.companyId;
    this.regionId = a.regionId;

    this.loadRegions();

    this.isEditMode = true;
  }

  deleteAccount(a: AccountType) {

    Swal.fire({
      title: `Delete "${a.accountType1}"?`,
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes delete'
    }).then(result => {

      if (result.isConfirmed) {

        this.spinner.show();

        this.adminService.deleteAccountType(a.accountTypeId).subscribe({
          next: () => {

            this.spinner.hide();

            Swal.fire('Deleted!','Account Type deleted successfully','success');

            this.loadAccountTypes();
          },
          error: () => {
            this.spinner.hide();
            Swal.fire('Error','Delete failed','error');
          }
        });

      }

    });
  }

  filteredAccounts(): AccountType[] {

    const search = this.searchText?.toLowerCase() || '';

    return this.accountTypes.filter(x =>
      x.accountType1?.toLowerCase().includes(search)
    );
  }

loadCompanies() {
  console.log("Companies:", this.companies);

  this.adminService.getCompanies(null, this.userId).subscribe({

    next: (res: any) => {

      console.log("Company API Response:", res);

      this.companies = Array.isArray(res) ? res : [];

      this.companyMap = {};

      this.companies.forEach((c: any) => {
        this.companyMap[c.companyId] = c.companyName;
      });

      if (this.companyId) {
        this.loadRegions();
      }

    },

    error: () => Swal.fire('Error','Failed to load companies','error')
  });
}
  loadRegions(){

    this.adminService.getRegions(null,this.userId).subscribe({

      next:(res:Region[])=>{

        const allRegions = res || [];

        this.regionMap = {};

        allRegions.forEach(r=>{
          this.regionMap[r.regionID] = r.regionName;
        });

        this.regions = allRegions.filter(r =>
          r.companyID == this.companyId
        );

        if(!this.regionId && this.regions.length>0){
          this.regionId = this.regions[0].regionID;
        }

        this.account.regionId = this.regionId;
      },

      error: ()=>Swal.fire('Error','Failed to load regions','error')
    });
  }

  onCompanyChange(){
 debugger;
    sessionStorage.setItem('CompanyId',this.companyId.toString());

    this.account.companyId = this.companyId;

    this.regionId = 0;

    this.regions = [];

    this.loadRegions();
  }

  onRegionChange(){

    sessionStorage.setItem('RegionId',this.regionId.toString());

    this.account.regionId = this.regionId;
  }

  resetForm(){

    Swal.fire({
      title:'Reset Form?',
      text:'All entered data will be cleared.',
      icon:'question',
      showCancelButton:true,
      confirmButtonText:'Yes reset'
    }).then(result=>{

      if(result.isConfirmed){
        this.clearForm();
      }

    });
  }

  clearForm(){

    this.account = {
      accountTypeId: 0,
      companyId: this.companyId,
      regionId: this.regionId,
      accountType1: '',
      description: '',
      isActive: true
    };

    this.isEditMode = false;
  }
}
