import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { MaskService } from './services/mask.service';

@Component({
  selector: 'app-spinner',
  template: `<div [ngClass]="{hide: maskService.visible}"></div>`,
  styleUrls: ['./spinner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent {

  constructor(public maskService: MaskService) { }


}
