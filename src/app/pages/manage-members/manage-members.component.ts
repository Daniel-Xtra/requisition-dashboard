import { Component } from '@angular/core';
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
export class ManageMembersComponent {
  memberPages = MemberPages;
  activePage: MemberPages = MemberPages.TOTAL_MEMBERS;
  pageTitle: TPageTitle = {
    INACTIVE_MEMBERS: 'Inactive members',
    ACTIVE_MEMBERS: 'Active members',
    TOTAL_MEMBERS: 'Total members',
    VIEW_MEMBER: 'View member',
  };

  pageChangeHandler(page: any) {
    this.activePage = page;
  }
}
