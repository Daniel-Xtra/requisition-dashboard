import { inject, Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocketEvents } from 'src/app/app.enum';
import { ToastService } from '../toast/toast.service';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;
  socket_url = environment.WEBSOCKET;
  private toast = inject(ToastService);
  constructor() {
    let connectionOptions = {
      transports: ['websocket', 'polling'],
    };
    this.socket = io(this.socket_url, connectionOptions);
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventname: string, data: any) {
    return this.socket.emit(eventname, data);
  }

  setUp(email, membership) {
    if (email) {
      this.socket.emit(SocketEvents.NEW_CONNECTION, email);
      this.socket.on(SocketEvents.NEW_CONNECTION, () => {
        this.socket.emit(SocketEvents.JOINED, membership);

        this.socket.on(SocketEvents.ROOM_MESSAGE, (data) => {
          this.toast.info(data + ' ' + membership);
        });
      });
      this.socket.on(SocketEvents.TIME_OUT, (error) => {
        console.error('Socket Timeout: ', error);
        this.socket.emit(SocketEvents.NEW_CONNECTION, email);
      });

      this.socket.on(SocketEvents.ERROR, (error) => {
        console.error('Socket Error: ', error);
        this.socket.emit(SocketEvents.NEW_CONNECTION, email);
      });
    }
  }

  storeReview(unique_id: string) {
    this.socket.emit(SocketEvents.STORE_REVIEW, unique_id);
  }

  ictReview(unique_id: string) {
    this.socket.emit(SocketEvents.ICT_REVIEW, unique_id);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
