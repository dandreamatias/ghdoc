import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GhRepoService } from 'src/app/services/gh-repo.service';

@Component({
  selector: 'app-gh-page',
  templateUrl: './gh-page.component.html',
  styleUrls: ['./gh-page.component.scss']
})
export class GhPageComponent implements OnInit {
  html$: Observable<SafeHtml>;

  constructor(
    private route: ActivatedRoute,
    public ghRepoService: GhRepoService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.html$ = this.ghRepoService.pages$.pipe(map(d => this.sanitizer.bypassSecurityTrustHtml(d)));
    this.route.params.subscribe((params => this.ghRepoService.setPage(params.section)));
  }
}
