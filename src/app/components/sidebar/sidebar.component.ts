import { CommonModule } from '@angular/common';
import { Component, NO_ERRORS_SCHEMA, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SocketEvents } from 'src/app/app.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { SocketService } from 'src/app/services/socket/socket.service';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class?: string;
  role: string[];
  badge?: boolean;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'assets/icons/home.svg',
    role: ['staff', 'admin', 'ict', 'store'],
  },

  {
    path: '/manage-members',
    title: 'Manage Members',
    icon: 'assets/icons/members.svg',
    role: ['admin'],
  },
  {
    path: '/my-requisitions',
    title: 'My Requisitions',
    icon: 'assets/icons/history.svg',
    role: ['staff'],
  },
  {
    path: '/requisitions',
    title: 'Requisitions',
    icon: 'assets/icons/history.svg',
    role: ['admin'],
  },
  {
    path: '/manage-requisitions',
    title: 'Manage Requisitions',
    icon: 'assets/icons/loan.svg',
    role: ['store'],
    badge: true,
  },
  {
    path: '/review-requisitions',
    title: 'Review Requisition',
    icon: 'assets/icons/history.svg',
    role: ['ict'],
    badge: true,
  },
  {
    path: '/settings',
    title: 'Settings',
    icon: 'assets/icons/vault.svg',
    role: ['staff', 'ict', 'store', 'admin'],
  },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public menuItems!: any[];
  public isCollapsed = true;
  public role: any;
  private socket = inject(SocketService);
  private apiService = inject(ApiService);
  count: number = 0;

  constructor(private router: Router) {
    this.socket.listen(SocketEvents.ICT_STORE).subscribe((data) => {
      this.count = data;
    });
    this.socket.listen(SocketEvents.STORE_MESSAGE).subscribe((data) => {
      // this.count = data;
      console.log(data);
    });
  }

  ngOnInit() {
    // this.menuItems = ROUTES.filter((menuItem) => menuItem);
    // this.router.events.subscribe((event) => {
    //   this.isCollapsed = true;
    // });
    this.getRole();
    let toggle = document.querySelector('.closer') as HTMLElement;
    let sidebar = document.querySelector('.sidebar');

    toggle.onclick = function () {
      sidebar.classList.toggle('active');
    };
    document
      .querySelectorAll('.sidebar-dropdown-toggle')
      .forEach(function (item) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          const parent = item.closest('.group');
          if (parent.classList.contains('selected')) {
            parent.classList.remove('selected');
          } else {
            document
              .querySelectorAll('.sidebar-dropdown-toggle')
              .forEach(function (i) {
                i.closest('.group').classList.remove('selected');
              });
            parent.classList.add('selected');
          }
        });
      });
    // this.dropdown();
  }

  dropdown() {
    document.querySelector('#submenu').classList.toggle('hidden');
    document.querySelector('#arrow').classList.toggle('rotate-0');
  }
  getRole() {
    this.role = this.apiService.appUser()?.membership_type;

    this.menuItems = ROUTES.filter((menu) => {
      return menu.role.includes(this.role);
    });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

  onClick() {
    this.router.navigate(['settings'], { skipLocationChange: true });
  }
}
