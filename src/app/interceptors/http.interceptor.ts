import { Injectable, inject } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ApiService } from '../services/api/api.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private apiService = inject(ApiService);
  private toast = inject(ToastrService);
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.apiService.authToken;

    request = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
    });

    // make suure to set content type to JSOn on every request
    // if (!request.headers.has('Content-Type')) {
    //   request = request.clone({
    //     headers: request.headers.set('Content-Type', 'application/json'),
    //   });
    // }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json'),
    });

    if (request.method === 'GET') {
      request = request.clone({
        headers: new HttpHeaders({
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          Authorization: `Bearer ${accessToken}`,
        }),
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),

      catchError((error: HttpErrorResponse) => {
        this.toast.error(
          error.error.message ? error.error.message : 'An Error Occured',
          'Error',
          {
            timeOut: 4000,
          }
        );
        if (error.status === 401) {
          this.apiService.logout(true);
        }
        return throwError(error);
      })
    );
  }
}
