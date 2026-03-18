import { Component } from '@angular/core';
import { AdminService } from '../admin/servies/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan',
  standalone: false,
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {
 plans:any[] = [];

  plan:any = {
    planName:'',
    maxUsers:0,
    durationInDays:0,
    price:0
  };

  editMode = false;

  constructor(private planService:AdminService,  private router: Router){}
assignModules(planId:number){
  this.router.navigate(['/superadmin/assign-modules', planId]);
}
  ngOnInit(){
    this.loadPlans();
  }

  loadPlans(){
    this.planService.getPlanss().subscribe((res:any)=>{
      this.plans = res;
    });
  }

  savePlan(){

    if(this.editMode){
      this.planService.updatePlan(this.plan).subscribe(()=>{
        this.reset();
        this.loadPlans();
      });
    }
    else{
      this.planService.createPlan(this.plan).subscribe(()=>{
        this.reset();
        this.loadPlans();
      });
    }

  }

  editPlan(p:any){
    this.plan = {...p};
    this.editMode = true;
  }

  deletePlan(id:number){

    if(confirm("Delete this plan?")){
      this.planService.deletePlan(id).subscribe(()=>{
        this.loadPlans();
      });
      this.loadPlans();
    }
    

  }

  reset(){
    this.plan = {
      planName:'',
      maxUsers:0,
      durationInDays:0,
      price:0
    };
    this.editMode = false;
  }
}


