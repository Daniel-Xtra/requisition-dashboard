import { Component, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TDepartment } from 'src/app/types/definition';
enum RegisterPages {
  REGISTER = 'REGISTER',
  OTP = 'OTP',
}
type TPageTitle = {
  [key: string | symbol]: string;
};
@Component({
  selector: 'app-register',

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput: NgOtpInputComponent;
  passwordType: string = 'password';
  passwordIcon: string = 'fa fa-eye-slash';
  height: number = window.innerHeight;
  registerPages = RegisterPages;
  activePage: RegisterPages = this.registerPages.REGISTER;
  pageTitle: TPageTitle = {
    REGISTER: 'Register',
    OTP: 'Otp',
  };
  otp: string;
  registerForm: FormGroup;
  departments: TDepartment[] = [];

  private apiService = inject(ApiService);
  private toast = inject(ToastService);

  constructor(private router: Router) {
    this.initialize();
    this.division();
  }

  initialize() {
    this.registerForm = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      phone_number: new FormControl('', [Validators.required]),
      gender: new FormControl(''),
      password: new FormControl('', [Validators.required]),
      current_position: new FormControl(''),
      division: new FormControl('', [Validators.required]),
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon =
      this.passwordIcon === 'fa fa-eye-slash' ? 'fa fa-eye' : 'fa fa-eye-slash';
  }

  pageChangeHandler(page: any) {
    this.activePage = page;
  }

  login() {
    this.router.navigate(['/login']);
  }

  config: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
  };

  onOtpChange(otp: any) {
    this.otp = otp;
    if (this.otp.length == 6) {
      this.ngOtpInput.otpForm.disable();
      this.apiService.verifyOtp(this.otp).subscribe({
        next: ({ data, status }) => {
          if (data === 'email verified') {
            this.toast.success('Email verified');
            this.router.navigate(['/login']);
          }
        },
        error: ({ message }) => {
          this.ngOtpInput.otpForm.enable();
        },
      });
    }
  }

  requestReset() {
    this.apiService.requestOtp(this.registerForm.value.email).subscribe({
      next: ({ data, status, message }) => {},
      error: ({ message }) => {},
    });
  }

  async registerHandler() {
    const reg_obj = {
      first_name: this.registerForm.value.first_name,
      last_name: this.registerForm.value.last_name,
      phone_number: this.registerForm.value.phone_number,
      division: this.registerForm.value.division,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.apiService.signup(reg_obj).subscribe({
      next: async ({ data, status, message }) => {
        if (status) {
          // await this.apiService.setAuthenticatedToken(data.token);
          // await this.apiService.setAuthenticatedUser(data.user);
          // this.router.navigate(['/login']);
          //this.registerForm.reset();
          this.activePage = this.registerPages.OTP;

          // return;
        }
      },
      error: async ({ message }) => {
        // this.toast.error(message);
      },
    });
  }

  async division() {
    this.apiService.getDepartments().subscribe({
      next: async ({ data, status, message }) => {
        this.departments = [...data];
      },
      error: async ({ message }) => {},
    });
  }
}
