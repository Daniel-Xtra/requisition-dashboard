import { Component, inject } from '@angular/core';
import { SocketEvents } from 'src/app/app.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TResult } from 'src/app/types/user';
enum ManagePages {
  REQUESTS = 'REQUESTS',
  VIEW_REQUEST = 'VIEW_REQUEST',
}
type TPageTitle = {
  [key: string | symbol]: string;
};
@Component({
  selector: 'app-manage-requisitions',
  templateUrl: './manage-requisitions.component.html',
  styleUrl: './manage-requisitions.component.scss',
})
export class ManageRequisitionsComponent {
  requisitions: TResult[] = [];
  requisition: TResult;
  count: number = 0;
  private apiService = inject(ApiService);
  private toast = inject(ToastService);
  private socket = inject(SocketService);
  managePages = ManagePages;
  activePage: ManagePages = this.managePages.REQUESTS;
  activeTab: string;
  constructor() {
    this.store(1);
    this.socket.listen(SocketEvents.STORE_MESSAGE).subscribe((data) => {
      console.log(data);
    });
  }

  pageChangeHandler(page: any) {
    this.activePage = page;
  }

  getEmit(event) {
    this.activePage = this.managePages.REQUESTS;
  }

  getData(event) {
    let index = this.requisitions.findIndex((x) => x.id === event.id);
    this.requisitions.splice(index, 1, event);
  }

  singleData(data: TResult) {
    this.requisition = data;
  }

  store(page_no: number) {
    this.apiService
      .storeRequisitions({
        sort_by: 'all',
        page_no: page_no,
        per_page: 15,
      })
      .subscribe({
        next: ({ data }) => {
          this.requisitions = [...data.results];
          this.count = data.count;
        },
        error: (error) => {
          this.toast.error(error);
        },
      });
  }
}
