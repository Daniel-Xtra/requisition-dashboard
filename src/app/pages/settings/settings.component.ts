import {
  HttpClient,
  HttpErrorResponse,
  HttpEventType,
} from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TUser } from 'src/app/types/user';
import { environment } from 'src/environments/environment';

enum SettingPages {
  PROFILE_SETTINGS = 'PROFILE_SETTINGS',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  COMPLAIN = 'COMPLAIN',
}
type TPageTitle = {
  [key: string | symbol]: string;
};
@Component({
  selector: 'app-settings',

  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  user = signal<TUser | null>(null);
  settingPages = SettingPages;
  activePage: SettingPages = SettingPages.PROFILE_SETTINGS;
  selectedFile: File;
  updateProfile = {
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    membership_type: '',
    phone_number: '',
    division: '',
    verified: false,
    date_joined: '',
    current_position: '',
  };
  changePasswordForm: FormGroup;

  private apiService = inject(ApiService);
  private toast = inject(ToastService);
  private http = inject(HttpClient);

  constructor() {
    this.initialize();
  }

  ngOnInit(): void {
    this.user = this.apiService.appUser;
    this.updateProfile.first_name = this.user()?.first_name;
    this.updateProfile.last_name = this.user()?.last_name;
    this.updateProfile.email = this.user()?.email;
    this.updateProfile.membership_type = this.user()?.membership_type;
    this.updateProfile.phone_number = this.user()?.phone_number;
    this.updateProfile.division = this.user()?.division?.name;
    this.updateProfile.current_position =
      this.user()?.profile?.current_position;
    this.updateProfile.gender = this.user().gender;
    this.updateProfile.date_joined = this.user()?.created_at;
    this.updateProfile.verified = this.user()?.verified;
  }

  pageChangeHandler(page: any) {
    this.activePage = page;
  }

  initialize() {
    this.changePasswordForm = new FormGroup({
      old_password: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      confirm_password: new FormControl('', Validators.required),
    });
  }

  async onFileSelect(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      let type = this.selectedFile?.name.lastIndexOf('.') + 1;
      var extFile = this.selectedFile?.name
        .substr(type, this.selectedFile?.name?.length)
        .toLowerCase();
      if (extFile == 'jpg' || extFile == 'jpeg' || extFile == 'png') {
        // const formData = new FormData();
        // formData.append('photo', this.selectedFile);
        await this.uploadFile(this.selectedFile);
      } else {
        this.toast.error('Only jpg/jpeg and png files are allowed!');
      }
    }
  }

  // async uploadFile(file) {
  //   this.apiService.upload(file).subscribe({
  //     next: async (res: any) => {
  //       this.toast.success('Profile picture uploaded');
  //       const updatedProfile = res;

  //       let user = this.apiService.appUser();

  //       user.profile.profile_picture_url =
  //         updatedProfile.data.profile_picture_url;

  //       console.log(user);
  //       await this.apiService.setAuthenticatedUser(user);
  //     },
  //     error: () => {},
  //   });
  // }

  async profileUpdate() {
    this.apiService
      .profileUpdate({ current_position: this.updateProfile.current_position })
      .subscribe({
        next: async (res: any) => {
          this.toast.success('Profile picture uploaded');
          const updatedProfile = res;
          let user = this.apiService.appUser();
          user.profile.current_position = updatedProfile.data.current_position;
          await this.apiService.setAuthenticatedUser(user);
        },
        error: () => {},
      });
  }

  async changePassword() {
    const reg_obj = {
      old_password: this.changePasswordForm.value.old_password,
      new_password: this.changePasswordForm.value.new_password,
    };
    this.apiService.changePassword(reg_obj).subscribe({
      next: (_res: any) => {
        this.toast.success('Password change was successful');
        this.changePasswordForm.reset();
      },
      error: () => {},
    });
  }

  uploadFile(file) {
    const formData = new FormData();
    formData.append('photo', file);

    file.inProgress = true;

    this.upload(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          this.selectedFile = null;
          // this.toast.error(`${file.name} upload failed.`);
          return of(`${file.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.toast.success('Uploaded successfully');
          this.selectedFile = null;
        }
      });
  }

  upload(formData) {
    const token = this.apiService.authToken;

    return this.http.post(`${environment.BASE_URL}/profiles/upload`, formData, {
      reportProgress: true,
      observe: 'events',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
