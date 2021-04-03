import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MaskService } from './services/mask.service';

@Component({
  selector: 'app-spinner',
  template: `<div class="spinner-container" *ngIf="maskService.httpProgress() | async">
    <div class="spinner"></div>
  </div>`,
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  constructor(public maskService: MaskService) { }
}
