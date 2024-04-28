import { Component, OnInit, inject, signal } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { SocketService } from 'src/app/services/socket/socket.service';
import { TUser } from 'src/app/types/user';

@Component({
  selector: 'app-page',

  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent implements OnInit {
  user = signal<TUser | null>(null);
  private socket = inject(SocketService);
  private apiService = inject(ApiService);

  ngOnInit(): void {
    this.user = this.apiService.appUser;
    this.socket.setUp(this.user().email, this.user().membership_type);
  }
}
