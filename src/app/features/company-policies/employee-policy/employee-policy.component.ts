import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../admin/servies/admin.service';

interface Policy {
  Title: string
  Category: string
  EffectiveDate: Date
  Description?: string
  FileName?: string
  FileUrl?: string
  DepartmentId: number
  CompanyId: number
  RegionId: number
}
@Component({
  selector: 'app-employee-policy',
  standalone: false,
  templateUrl: './employee-policy.component.html',
  styleUrl: './employee-policy.component.css'
})
export class EmployeePolicyComponent {
  policies: Policy[] = []
  filteredPoliciesList: Policy[] = []

  categories: string[] = []

  selectedCategory: string = ''
  fromDate?: string
  toDate?: string

  userId: number = 0
  userDepartmentId: number = 0
  userCompanyId: number = 0
  userRegionId: number = 0

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {

    this.userId = Number(sessionStorage.getItem("UserId"))
    this.userDepartmentId = Number(sessionStorage.getItem("DepartmentId"))
    this.userCompanyId = Number(sessionStorage.getItem("CompanyId"))
    this.userRegionId = Number(sessionStorage.getItem("RegionId"))

    console.log("UserId:", this.userId)
    console.log("DepartmentId:", this.userDepartmentId)
    this.loadCategories()

    this.getPolicies()

  }

  // -----------------------------
  // Get Policies
  // -----------------------------
  getPolicies() {

  this.adminService.getTodayPolicies(this.userId)
    .subscribe((res: any[]) => {

      console.log("Policy API Response:", res)

      this.policies = res.map(p => ({

        Title: p.policyTitle,
        Category: p.categoryName,
        EffectiveDate: new Date(p.effectiveDate),
        Description: p.policyDescription,
        FileName: p.fileName,
        FileUrl: p.fileUrl,
        DepartmentId: Number(p.departmentId),
        CompanyId: Number(p.companyId),
        RegionId: Number(p.regionId)

      }))

      this.loadCategories()
      this.filterTodayPolicies()

    })

}

  // -----------------------------
  // Load Categories
  // -----------------------------
  loadCategories() {

  this.adminService
    .getUserPolicyCategories(this.userCompanyId, this.userRegionId)
    .subscribe((res: string[]) => {

      console.log("Categories API:", res);

      this.categories = res;

    });

}
  // -----------------------------
  // Show Today's Policies
  // -----------------------------
  filterTodayPolicies() {

    const today = new Date().toDateString()

    this.filteredPoliciesList = this.policies.filter(p => {

      const policyDate = new Date(p.EffectiveDate).toDateString()

      return (
        p.DepartmentId === this.userDepartmentId &&
        policyDate === today
      )

    })

  }

  // -----------------------------
  // Apply Filter
  // -----------------------------
  applyFilter() {
  this.filteredPoliciesList = this.policies.filter(p => {
    const matchCompany = p.CompanyId === this.userCompanyId;
    const matchRegion = p.RegionId === this.userRegionId;
    const matchCategory = this.selectedCategory ? p.Category === this.selectedCategory : true;
    const matchFrom = this.fromDate ? new Date(p.EffectiveDate) >= new Date(this.fromDate) : true;
    const matchTo = this.toDate ? new Date(p.EffectiveDate) <= new Date(this.toDate) : true;

    return matchCompany && matchRegion && matchCategory && matchFrom && matchTo;
  });
}
}
