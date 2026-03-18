import { Component } from '@angular/core';
import { AdminService } from '../admin/servies/admin.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-assignmodules',
  standalone: false,
  templateUrl: './assignmodules.component.html',
  styleUrl: './assignmodules.component.css'
})
export class AssignmodulesComponent {

   modules:any[]=[];
  selectedModules:number[]=[];
  planId:number=0;

  constructor(
    private planService:AdminService,
    private route:ActivatedRoute,
    private router:Router
  ){}

  ngOnInit(){

    this.planId = Number(this.route.snapshot.paramMap.get('planId'));

    this.loadModules();

  }

  // loadModules(){

  //   this.planService.getPlanModules(this.planId)
  //   .subscribe((res:any)=>{

  //     this.modules = res;

  //     this.selectedModules = res
  //     .filter((x:any)=>x.selected)
  //     .map((x:any)=>x.moduleId);

  //   });

  // }

 loadModules(){

  this.planService.getPlanModules(this.planId)
  .subscribe((res:any)=>{

    const mainMenus = res.filter((x:any)=>x.parentMenuId == null);

    mainMenus.forEach((menu:any)=>{
        menu.children = res.filter((x:any)=>x.parentMenuId == menu.moduleId);
    });

    this.modules = mainMenus;

    // initialize selected modules
    this.selectedModules = res
      .filter((x:any)=>x.selected)
      .map((x:any)=>x.moduleId);

  });

}

 toggleModule(id:number,event:any,parent?:any){

  const checked = event.target.checked;

  if(checked){

    if(!this.selectedModules.includes(id)){
      this.selectedModules.push(id);
    }

  }else{

    this.selectedModules =
    this.selectedModules.filter(x=>x!=id);

  }

  // If main menu clicked → toggle all children
  if(!parent){

    const menu = this.modules.find(m=>m.moduleId==id);

    if(menu && menu.children){

      menu.children.forEach((child:any)=>{

        if(checked){

          if(!this.selectedModules.includes(child.moduleId)){
            this.selectedModules.push(child.moduleId);
          }

        }else{

          this.selectedModules =
          this.selectedModules.filter(x=>x!=child.moduleId);

        }

      });

    }

  }

  // If child clicked → check parent logic
  if(parent){

    const parentMenu = this.modules.find(m=>m.moduleId==parent);

    const allChildrenSelected =
      parentMenu.children.every((c:any)=>
        this.selectedModules.includes(c.moduleId)
      );

    if(allChildrenSelected){

      if(!this.selectedModules.includes(parent)){
        this.selectedModules.push(parent);
      }

    }else{

      this.selectedModules =
        this.selectedModules.filter(x=>x!=parent);

    }

  }

}

 saveModules(){

  const data = {
    planId: this.planId,
    moduleIds: this.selectedModules
  };

  this.planService.assignModules(data)
  .subscribe((res:any)=>{

    console.log("Response:", res);
    console.log("Navigation starting...");

    alert("Modules Assigned Successfully");

    this.router.navigate(['/superadmin/subscription-plans']);

  });
}

  cancel(){
   this.router.navigate(['/superadmin/subscription-plans']);
  }

}
