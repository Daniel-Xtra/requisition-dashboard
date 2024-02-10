import { Component, OnInit, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { TUser } from 'src/app/types/definition';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { ROUTES } from '../sidebar/sidebar.component';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-navbar',

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  user = signal<TUser | null>(null);
  public focus: any;
  public listTitles: any;
  public location: Location;
  info: any;
  private apiService = inject(ApiService);

  constructor(location: Location) {
    this.location = location;
  }

  ngOnInit(): void {
    this.user = this.apiService.appUser;
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    let toggle = document.querySelector('.menu-toggler') as HTMLElement;
    let sidebar = document.querySelector('.sidebar');
    toggle.onclick = function () {
      sidebar.classList.toggle('active');
    };
    this.dropdown();
  }

  dropdown() {
    document.querySelector('.subre').classList.toggle('hidden');
    // document.querySelector('#arrow').classList.toggle('rotate-0');
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }

  logout() {
    this.apiService.logout();
  }
}
