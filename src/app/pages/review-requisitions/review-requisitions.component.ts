import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TResult } from 'src/app/types/user';
enum ReviewPages {
  REQUESTS = 'REQUESTS',
  VIEW_REQUEST = 'VIEW_REQUEST',
}
type TPageTitle = {
  [key: string | symbol]: string;
};
@Component({
  selector: 'app-review-requisitions',
  templateUrl: './review-requisitions.component.html',
  styleUrl: './review-requisitions.component.scss',
})
export class ReviewRequisitionsComponent implements OnInit {
  requisitions: TResult[] = [];
  requisition: TResult;
  count: number = 0;
  private apiService = inject(ApiService);
  private toast = inject(ToastService);
  reviewPages = ReviewPages;
  activePage: ReviewPages = this.reviewPages.REQUESTS;
  activeTab: string;
  constructor() {
    this.ict(1);
  }

  ngOnInit(): void {}

  pageChangeHandler(page: any) {
    this.activePage = page;
  }

  getEmit(page: any) {
    this.activePage = this.reviewPages.REQUESTS;
  }

  singleData(data: TResult) {
    this.requisition = data;
  }

  ict(page_no: number) {
    this.apiService
      .ictRequisitions({
        sort_by: 'ict_pending',
        page_no: page_no,
        per_page: 15,
      })
      .subscribe({
        next: ({ data }) => {
          this.requisitions = [...data.results];
          this.count = data.count;
        },
        error: (error) => {
          // this.toast.error(error);
        },
      });
  }
}
