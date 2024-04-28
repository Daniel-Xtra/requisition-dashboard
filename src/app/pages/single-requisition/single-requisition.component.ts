import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api/api.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { TRequests, TResult, TUser } from 'src/app/types/user';

@Component({
  selector: 'app-single-requisition',

  templateUrl: './single-requisition.component.html',
  styleUrl: './single-requisition.component.scss',
})
export class SingleRequisitionComponent implements OnInit {
  user = signal<TUser | null>(null);
  @Input() active: any;
  @Input() requisition: TResult;
  @Output() data = new EventEmitter<TResult>();
  @Output() page = new EventEmitter();
  ictForm: FormGroup;
  storeForm: FormGroup;
  private toast = inject(ToastService);
  private apiService = inject(ApiService);
  private socket = inject(SocketService);
  constructor() {
    this.initialize();
  }

  ngOnInit(): void {
    this.user = this.apiService.appUser;
  }

  pageSwitch() {
    this.page.emit(this.active);
  }

  initialize() {
    this.ictForm = new FormGroup({
      qty_approved: new FormControl('', Validators.required),
      comment: new FormControl(''),
    });
    this.storeForm = new FormGroup({
      qty_issued: new FormControl('', Validators.required),
    });
  }

  phoneKeyDown(e: any) {
    const keyCode = e.keyCode;
    if (
      (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
      (e.keyCode < 96 || e.keyCode > 105) &&
      e.keyCode != 8
    ) {
      e.preventDefault();
    }
  }

  ictReview(unique_id) {
    this.apiService.reviewIct(unique_id, this.ictForm.value).subscribe({
      next: (res) => {
        this.socket.ictReview(unique_id);
        this.toast.success('Request approved');
        this.pageSwitch();
      },
      error: (error) => {
        // this.toast.error(error);
      },
    });
  }

  storeReview(unique_id) {
    this.apiService.reviewStore(unique_id, this.storeForm.value).subscribe({
      next: ({ data }) => {
        this.requisition = data;
        this.socket.storeReview(unique_id);
        this.data.emit(data);
        this.toast.success('Request Issued');
      },
      error: () => {},
    });
  }
}
