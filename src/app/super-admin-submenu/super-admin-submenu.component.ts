import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { debounce, fromEvent, Subscription, timer } from 'rxjs';
export interface Submenu {
  title: string;
  route: string;
  icon?: string;
}
@Component({
  selector: 'app-super-admin-submenu',
  standalone: false,
  templateUrl: './super-admin-submenu.component.html',
  styleUrl: './super-admin-submenu.component.css'
})




export class SuperAdminSubmenuComponent implements AfterViewInit, OnDestroy{
   @Input() submenus: Submenu[] = [];
  @Input() activeRoute = '';
  @Output() submenuSelected = new EventEmitter<string>();

  @ViewChild('container', { static: false }) containerRef!: ElementRef<HTMLDivElement>;

  visibleSubmenus: Submenu[] = [];
  hiddenSubmenus: Submenu[] = [];
  isDropdownOpen = false;

  private resizeSub?: Subscription;
  private reservedWidth = 130;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.adjustSubmenus(), 50);

    this.resizeSub = fromEvent(window, 'resize')
      .pipe(debounce(() => timer(150)))
      .subscribe(() => this.adjustSubmenus());
  }

  ngOnDestroy(): void {
    this.resizeSub?.unsubscribe();
  }

  selectSubmenu(route: string): void {
    this.isDropdownOpen = false;
    this.submenuSelected.emit(route);
   // if (route !== '#') this.router.navigate([route]).catch(() => {});
  }

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
    this.cdr.detectChanges();
  }

  @HostListener('document:click')
  closeDropdownOnOutside() {
    if (this.isDropdownOpen) {
      this.isDropdownOpen = false;
      this.cdr.detectChanges();
    }
  }

  stopProp(evt: MouseEvent) {
    evt.stopPropagation();
  }

  adjustSubmenus(): void {
    const containerEl = this.containerRef?.nativeElement;
    if (!containerEl) return;

    const containerWidth = containerEl.getBoundingClientRect().width;
    const availableWidth = containerWidth - this.reservedWidth;

    const temp = document.createElement('div');
    temp.style.position = 'absolute';
    temp.style.visibility = 'hidden';
    temp.style.whiteSpace = 'nowrap';
    temp.style.font = getComputedStyle(containerEl).font;
    document.body.appendChild(temp);

    const visible: Submenu[] = [];
    const hidden: Submenu[] = [];
    let usedWidth = 0;

    for (const sub of this.submenus) {
      temp.innerText = sub.title;
      const iconWidth = sub.icon ? 22 : 0;
      const width = temp.offsetWidth + iconWidth + 48;

      if (usedWidth + width <= availableWidth || visible.length === 0) {
        visible.push(sub);
        usedWidth += width;
      } else {
        hidden.push(sub);
      }
    }

    document.body.removeChild(temp);

    this.visibleSubmenus = visible;
    this.hiddenSubmenus = hidden;
    this.cdr.detectChanges();
  }

  isActive(route: string) {
    return this.activeRoute === route;
  }

}
