import { Component, inject } from '@angular/core';
import { SocketEvents } from 'src/app/app.enum';
import { ApiService } from 'src/app/services/api/api.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TResult } from 'src/app/types/user';

@Component({
  selector: 'app-my-requisitions',

  templateUrl: './my-requisitions.component.html',
  styleUrl: './my-requisitions.component.scss',
})
export class MyRequisitionsComponent {
  myRequisitions: TResult[] = [];
  count: number;

  private apiService = inject(ApiService);
  private toast = inject(ToastService);
  private socket = inject(SocketService);
  constructor() {
    this.fetchRequsitions(1);
    this.socket.listen(SocketEvents.ICT_REVIEW).subscribe((data) => {
      let index = this.myRequisitions.findIndex((x) => x.id === data.id);
      this.myRequisitions.splice(index, 1, data);
    });
    this.socket.listen(SocketEvents.STORE_REVIEW).subscribe((data) => {
      let index = this.myRequisitions.findIndex((x) => x.id === data.id);
      this.myRequisitions.splice(index, 1, data);
    });
  }

  openModal() {
    document.getElementById('request-modal').style.display = 'block';
    document.getElementsByTagName('body')[0].classList.add('overflow-y-hidden');
  }

  fetchRequsitions(page_no: number) {
    this.apiService
      .myRequisitions({ sort_by: 'all', page_no: page_no, per_page: 15 })
      .subscribe({
        next: ({ data }) => {
          this.myRequisitions = [...data.results];
          this.count = data.count;
        },
        error: (error) => {
          // this.toast.error(error);
        },
      });
  }
}
