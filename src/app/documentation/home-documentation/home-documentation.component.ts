import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as hljs from 'highlight.js'

@Component({
  selector: 'app-home-documentation',
  templateUrl: './home-documentation.component.html',
  styleUrls: ['./home-documentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDocumentationComponent implements OnInit {
  @ViewChild('htmlContainer') codeElement: ElementRef;
  html$: Observable<string>;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.html$ = this.activatedRoute.data.pipe(map(d => d.readme));
  }



  ngAfterViewInit() {
    this.codeElement.nativeElement.querySelectorAll('pre').forEach(element => {
      (hljs as any).highlightElement(element);
    });
  }

}
