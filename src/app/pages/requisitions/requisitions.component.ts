import { Component, OnInit, inject } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { TList } from 'src/app/types/definition';
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
  requisitionPages = RequisitionPages;
  activePage: RequisitionPages = RequisitionPages.REQUISITIONS;
  pageTitle: TPageTitle = {
    REQUISITIONS: 'Requisitions',
    REQUISTION_DETAILS: 'Requisition details',
  };
  statuses = ['all', 'ict_pending', 'store_pending', 'issued', 'cancelled'];
  requisitions: TList[] = [];
  count: number;

  private apiService = inject(ApiService);

  constructor() {}

  ngOnInit() {
    this.adminRequisitions();
  }

  pageChangeHandler(page: any) {
    this.activePage = page;
  }

  adminRequisitions() {
    this.apiService.allRequisition('all', 1, 15).subscribe({
      next: ({ data }) => {
        console.log(data);
        this.requisitions = [data.list];
        this.count = data.count;
      },
      error: ({}) => {},
    });
  }
}
