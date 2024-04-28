import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { TStaff } from 'src/app/types/staff';
import { NgForm } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { DatePipe } from '@angular/common';
import { TDepartment, TResult } from 'src/app/types/user';
enum ViewPages {
  PROFILE_SETTINGS = 'PROFILE_SETTINGS',
  ICT = 'ICT',
  STORE = 'STORE',
  ISSUED = 'ISSUED',
}
type TPageTitle = {
  [key: string | symbol]: string;
};
@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrl: './view-member.component.scss',
})
export class ViewMemberComponent implements OnInit {
  @Input() active: any;
  @Input() member: TStaff;
  @Output() page = new EventEmitter();
  @Output() update = new EventEmitter<TStaff>();
  viewPages = ViewPages;
  activePage: ViewPages = ViewPages.PROFILE_SETTINGS;
  departments: TDepartment[] = [];
  requisitions: TResult[] = [];
  count: number = 0;

  updateMember = {
    first_name: '',
    last_name: '',
    email: '',
    membership_type: '',
    phone_number: '',
    division: '',
    verified: false,
    date_joined: '',
  };

  private apiService = inject(ApiService);
  private toast = inject(ToastService);

  ngOnInit(): void {
    this.updateMember.first_name = this.member?.first_name;
    this.updateMember.last_name = this.member?.last_name;
    this.updateMember.email = this.member?.email;
    this.updateMember.membership_type = this.member?.membership_type;
    this.updateMember.phone_number = this.member?.phone_number;
    this.updateMember.division = this.member?.division?.name;
    this.updateMember.date_joined = this.member?.created_at;
    this.updateMember.verified = this.member?.verified;
    this.division();
  }

  pageChangeHandler(page: any) {
    this.activePage = page;
  }

  pageSwitch() {
    this.page.emit(this.active);
  }

  updateStaff() {
    this.apiService
      .updateMember(this.updateMember.email, this.updateMember)
      .subscribe({
        next: ({ data }) => {
          this.member = data;
          this.update.emit(data);
          this.apiService.staffAnalytics().subscribe();
          this.toast.success('Staff details updated');
        },
        error: (error) => {
          // this.toast.error(error);
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

  memberReq(email: string, sort_by: string, page_no: number) {
    this.apiService
      .adminMemberReq(email, {
        sort_by: sort_by,
        page_no: page_no,
        per_page: 15,
      })
      .subscribe({
        next: ({ data }) => {
          this.requisitions = [...data.results];
          this.count = data.count;
        },
        error: () => {},
      });
  }
}
