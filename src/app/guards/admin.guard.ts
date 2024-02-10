import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

import { ApiService } from '../services/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private apiService = inject(ApiService);
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.apiService.appUser();

    if (currentUser) {
      if (
        route.data['membership_type'] &&
        route.data['membership_type'].indexOf(currentUser.membership_type) ===
          -1
      ) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
