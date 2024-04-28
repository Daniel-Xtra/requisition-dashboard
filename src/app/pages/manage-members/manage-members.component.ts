import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { TStaff } from 'src/app/types/staff';
enum MemberPages {
  INACTIVE_MEMBERS = 'INACTIVE_MEMBERS',
  ACTIVE_MEMBERS = 'ACTIVE_MEMBERS',
  TOTAL_MEMBERS = ' TOTAL_MEMBERS',
  VIEW_MEMBER = 'VIEW_MEMBER',
}
type TPageTitle = {
  [key: string | symbol]: string;
};

@Component({
  selector: 'app-manage-members',

  templateUrl: './manage-members.component.html',
  styleUrl: './manage-members.component.scss',
})
export class ManageMembersComponent implements OnInit {
  activeMember = signal<number>(0);
  inactiveMember = signal<number>(0);
  totalMember = computed(() => this.activeMember() + this.inactiveMember());
  staffs: TStaff[] = [];
  memberPages = MemberPages;
  activePage: MemberPages = this.memberPages.TOTAL_MEMBERS;

  staff: TStaff;
  activeTab: string;
  private apiService = inject(ApiService);

  constructor() {
    this.fetchStaffs(1);
    this.analytics();
  }

  ngOnInit(): void {
    this.activeMember = this.apiService.activeUsers;
    this.inactiveMember = this.apiService.inactiveUsers;

    this.activeTab = this.activePage;
  }

  pageChangeHandler(page: any) {
    this.activePage = page;
  }
  getEmit(page: any) {
    this.activePage = page;
  }

  getUpdate(update: TStaff) {
    let index = this.staffs.findIndex((x) => x.id == update.id);
    this.staffs.splice(index, 1, update);
  }

  singleData(data: TStaff) {
    this.staff = data;
  }

  fetchStaffs(page_no: number, sort_by?: any) {
    this.apiService
      .staffs({ page_no: page_no, ...(sort_by && { sort_by }) })
      .subscribe({
        next: ({ data }) => {
          this.staffs = [...data.results];
        },
        error: () => {},
      });
  }

  analytics() {
    this.apiService.staffAnalytics().subscribe();
  }
}
