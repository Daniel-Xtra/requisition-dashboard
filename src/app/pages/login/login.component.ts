import { Component, ViewChild, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgOtpInputComponent, NgOtpInputConfig } from 'ng-otp-input';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
enum LoginPages {
  LOGIN = 'LOGIN',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  VERIFY = 'VERIFY',
  NEW_PASSWORD = 'NEW_PASSWORD',
}
type TPageTitle = {
  [key: string | symbol]: string;
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  @ViewChild(NgOtpInputComponent, { static: false })
  ngOtpInput: NgOtpInputComponent;
  passwordVisible: boolean = false;
  loginPages = LoginPages;
  activePage: LoginPages = this.loginPages.LOGIN;
  pageTitle: TPageTitle = {
    LOGIN: 'Login',
    FORGOT_PASSWORD: 'Forgot password',
    VERIFY: 'Verify',
    NEW_PASSWORD: 'New password',
  };
  loginForm: FormGroup;
  resetForm: FormGroup;
  newPassForm: FormGroup;
  otp: string;

  private apiService = inject(ApiService);
  private toast = inject(ToastService);

  constructor(private router: Router) {
    this.initialize();
  }

  initialize() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),

      password: new FormControl('', [Validators.required]),
    });

    this.resetForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
    });

    this.newPassForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
    });
  }

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }

  pageChangeHandler(page: any) {
    this.activePage = page;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  config: NgOtpInputConfig = {
    allowNumbersOnly: false,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
  };

  async login() {
    const reg_obj = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.apiService.login(reg_obj).subscribe({
      next: async ({ data, status, message }) => {
        if (status) {
          await this.apiService.setAuthenticatedToken(data.token);
          await this.apiService.setAuthenticatedUser(data.user);
          this.router.navigate(['/dashboard']);

          return;
        }
      },
      error: async ({ message }) => {
        // this.toast.error(message);
      },
    });
  }

  onOtpChange(otp: any) {
    this.otp = otp;
    if (this.otp.length == 6) {
      this.ngOtpInput.otpForm.disable();
      this.apiService.verifyOTP(this.otp).subscribe({
        next: ({ data, status }) => {
          // if (data === 'email verified') {
          //   this.toast.success('Email verified');
          this.activePage = this.loginPages.NEW_PASSWORD;
          // }
        },
        error: ({ message }) => {
          this.ngOtpInput.otpForm.enable();
        },
      });
    }
  }

  requestReset() {
    this.apiService.requestReset(this.resetForm.value.email).subscribe({
      next: ({ data, status, message }) => {
        this.activePage = this.loginPages.VERIFY;
      },
      error: ({}) => {},
    });
  }

  newPassword() {
    this.apiService
      .resetPassword({
        code: this.otp,
        password: this.newPassForm.value.password,
      })
      .subscribe({
        next: ({ data, status, message }) => {
          this.activePage = this.loginPages.LOGIN;
        },
        error: ({ message }) => {},
      });
  }
}
