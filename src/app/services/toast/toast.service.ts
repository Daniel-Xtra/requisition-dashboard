import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastr: ToastrService) {}

  /**
   *
   *
   * @param {string} successMessage
   * @memberof ToastNotifications
   */
  success = (successMessage: string) => {
    this.toastr.success(successMessage);
  };

  /**
   *
   *
   * @param {string} errorMessage
   * @memberof ToastNotifications
   */
  error = (errorMessage: string) => {
    this.toastr.error(errorMessage);
  };

  /**
   *
   *
   * @param {string} warnMessage
   * @memberof ToastNotifications
   */
  warning = (warnMessage: string) => {
    this.toastr.warning(warnMessage);
  };

  /**
   *
   *
   * @param {string} infoMessage
   * @memberof ToastNotifications
   */
  info = (warnMessage: string) => {
    this.toastr.info(warnMessage);
  };
}
