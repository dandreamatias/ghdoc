import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GhRepoService } from 'src/app/services/gh-repo.service';
import { MaskService } from 'src/app/services/mask.service';

@Component({
  selector: 'app-gh-page',
  templateUrl: './gh-page.component.html',
  styleUrls: ['./gh-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GhPageComponent implements OnInit {
  html$: Observable<SafeHtml>;

  constructor(
    public ghRepoService: GhRepoService,
    private maskService: MaskService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.html$ = this.ghRepoService.pages$.pipe(
      map(d => this.sanitizer.bypassSecurityTrustHtml(d.content)),
      tap(() => this.maskService.setHttpProgressStatus(false)));
    this.route.params.subscribe(params => {
      params.section ? this.ghRepoService.setPage(params.section) : this.ghRepoService.showFirstPage();
    });
  }

  @HostListener('click', ['$event.target'])
  onClick(el) {
    if (el && el.href) {
      const indexStart = el.href.indexOf('#');
      if (indexStart >= 0) {
        const html = document.getElementById(el.href.slice(indexStart + 1));
        html.scrollIntoView({ behavior: 'smooth' })
        return false
      }
    }
  }
}
