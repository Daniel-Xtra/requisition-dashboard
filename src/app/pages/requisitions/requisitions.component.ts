import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { TResult } from 'src/app/types/user';

enum RequisitionPages {
  REQUISITIONS = 'REQUISITIONS',
  REQUISITION_DETAILS = 'REQUISITION_DETAILS',
}
type TPageTitle = {
  [key: string | symbol]: string;
};
@Component({
  selector: 'app-requisitions',

  templateUrl: './requisitions.component.html',
  styleUrl: './requisitions.component.scss',
})
export class RequisitionsComponent implements OnInit {
  @ViewChild('from') from: any;
  @ViewChild('to') to: any;
  requisitionPages = RequisitionPages;
  requisitions: TResult[] = [];
  activePage: RequisitionPages = RequisitionPages.REQUISITIONS;
  pageTitle: TPageTitle = {
    REQUISITIONS: 'Requisitions',
    REQUISTION_DETAILS: 'Requisition details',
  };
  statuses = ['all', 'ict_pending', 'store_pending', 'issued', 'cancelled'];
  count: number;
  sort_by: any;

  private apiService = inject(ApiService);

  constructor() {}

  ngOnInit() {
    this.adminRequisitions(1);
  }

  pageChangeHandler(page: any) {
    this.activePage = page;
  }

  adminRequisitions(page_no: number, sort_by?: string, from?: any, to?: any) {
    this.apiService
      .allRequisition({
        sort_by: sort_by || 'all',
        page_no: page_no,
        per_page: 15,
        ...(from && { from }),
        ...(to && { to }),
      })
      .subscribe({
        next: ({ data }) => {
          this.requisitions = [...data.results];
          this.count = data.count;
        },
        error: ({}) => {},
      });
  }

  selectedPurpose(e: any) {
    this.from.nativeElement.value = '';
    this.to.nativeElement.value = '';
    this.sort_by = e.target.value;
  }

  valueChange() {
    let from = this.from.nativeElement.value;
    let to = this.to.nativeElement.value;
    this.sort_by = '';
    if (from !== '' && to !== '') {
      this.adminRequisitions(1, this.sort_by, from, to);
    }
  }
}
