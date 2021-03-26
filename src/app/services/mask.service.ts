import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MaskService {
  private httpCounter = 0;

  show() {
    this.httpCounter++;
  }

  get visible() {
    console.log(this.httpCounter)
    return this.httpCounter === 0;
  }

  hide() {
    this.httpCounter--;
    if (this.httpCounter < 0) {
      this.httpCounter = 0;
    }
  }
}
