import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as hljs from 'highlight.js'
import { GhRepoService } from 'src/app/services/gh-repo.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-home-documentation',
  templateUrl: './home-documentation.component.html',
  styleUrls: ['./home-documentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDocumentationComponent implements OnInit {
  @ViewChild('htmlContainer') codeElement: ElementRef;
  html$: Observable<SafeHtml>;
  currentText: string

  constructor(private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    public menuService: MenuService,
    public ghRepoService: GhRepoService) { }

  ngOnInit(): void {
    this.html$ = merge(this.activatedRoute.data.pipe(map(d => (d.readme as string))), this.ghRepoService.pages$)
      .pipe(
        map(d => this.sanitizer.bypassSecurityTrustHtml(d)),
        tap(dom => setTimeout(() => this.codeElement.nativeElement.querySelectorAll('pre').forEach(element => (hljs as any).highlightElement(element))))
      );
  }

  @HostListener('click', ['$event'])
  onClick(event: any) {
    if (event.target?.href?.includes('#')) {
      event.preventDefault();
    }
  }

  onMenuClick(menu) {
    this.currentText = menu;
    if (document.body.clientWidth < 900) {
      this.menuService.updatePosition(false);
    }
    this.ghRepoService.setPage(menu);
  }
}
