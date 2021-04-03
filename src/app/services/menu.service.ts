import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private positionSubject = new BehaviorSubject(document.body.clientWidth > 900);
  public readonly menuOpen$ = this.positionSubject.asObservable()

  constructor() { }

  public updatePosition(isOpen: boolean) {
    this.positionSubject.next(isOpen);
  }

  get isOpen() {
    return this.positionSubject.getValue();
  }
}
