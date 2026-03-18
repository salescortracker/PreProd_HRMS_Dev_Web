import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-super-admin-sidebar',
  standalone: false,
  templateUrl: './super-admin-sidebar.component.html',
  styleUrl: './super-admin-sidebar.component.css'
})
export class SuperAdminSidebarComponent {
  @Input() Collapsed = false;
  @Output() menuSelected = new EventEmitter<string>();

  controlPanelOpen = false;
  securityOpen = false;
  toggleControlPanel(){
this.controlPanelOpen = !this.controlPanelOpen;
}

toggleSecurity(){
this.securityOpen = !this.securityOpen;
}

selectMenu(menu:string){
console.log(menu);
}

}
