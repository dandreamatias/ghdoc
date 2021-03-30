import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MaskService } from './services/mask.service';

@Component({
  selector: 'app-spinner',
  template: `<div *ngIf="maskService.httpProgress() | async"></div>`,
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  constructor(public maskService: MaskService) { }
}
