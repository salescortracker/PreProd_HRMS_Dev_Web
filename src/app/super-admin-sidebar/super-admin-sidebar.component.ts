import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-super-admin-sidebar',
  standalone: false,
  templateUrl: './super-admin-sidebar.component.html',
  styleUrl: './super-admin-sidebar.component.css'
})
export class SuperAdminSidebarComponent {
  @Input() collapsed = false;
  @Input() activeMenu: string = '';

  @Output() menuSelected = new EventEmitter<string>();

  selectMenu(menu:string){

    this.activeMenu = menu;

    this.menuSelected.emit(menu);

  }



}
