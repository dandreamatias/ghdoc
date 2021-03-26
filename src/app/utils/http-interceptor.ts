import { Injectable, Injector, NgZone } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MaskService } from '../services/mask.service';


@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private ngZone: NgZone, private maskService: MaskService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.maskService.show();
    console.log('intercept')
    return next.handle(request).pipe(
      finalize(() => this.maskService.hide())
    );
  }
}