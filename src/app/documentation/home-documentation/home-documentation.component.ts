import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as hljs from 'highlight.js'
import { GhRepoService } from 'src/app/services/gh-repo.service';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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
  faCoffee = faCoffee;

  constructor(private activatedRoute: ActivatedRoute,
    public ghRepoService: GhRepoService) { }

  ngOnInit(): void {
    this.html$ = this.activatedRoute.data.pipe(map(d => d.readme));
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (event.target?.href?.includes('#')) {
      event.preventDefault();
    }
  }


  ngAfterViewInit() {
    this.codeElement.nativeElement.querySelectorAll('pre').forEach(element => {
      (hljs as any).highlightElement(element);
    });
  }

}
