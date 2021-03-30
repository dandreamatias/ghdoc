import { Injectable, Injector, NgZone } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MaskService } from '../services/mask.service';


@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
  private counter = 0;

  constructor(private injector: Injector, private ngZone: NgZone, private maskService: MaskService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.counter === 0) {
      this.maskService.setHttpProgressStatus(true);
    }
    this.counter++;
    return next.handle(request).pipe(
      finalize(() => {
        this.counter--;
        if (this.counter === 0) {
          this.maskService.setHttpProgressStatus(false);
        }
      }));
  }
}