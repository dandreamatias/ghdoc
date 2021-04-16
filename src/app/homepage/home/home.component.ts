import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { GithubApiService } from 'src/app/services/github-api.service';
import { GITHUB_URL } from 'src/app/utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  repositories
  showRes = false;

  constructor(private router: Router,
    private githubApiService: GithubApiService) { }

  ngOnInit(): void {
  }


  @HostListener('click')
  onClick() {
    this.showRes = false;
  }

  onGoButtonClick(url: string) {
    const [username, repo] = this.parseUrl(url)
    this.router.navigate([username, repo])
  }

  onResultClick(username, repo) {
    this.router.navigate([username, repo])
  }

  private parseUrl(url: string): string[] {
    return url.slice(GITHUB_URL.length).split('/');
  }

  onInputType(e) {
    this.githubApiService.search(e.target.value).pipe(
      tap((data) => this.showRes = !!data?.length),
      map(data => data.map(repo => ({ name: repo.name, stars: Math.round(repo.stargazers_count / 100) / 10 + 'k', owner: repo.owner.login })))
    ).subscribe(data => this.repositories = data)
  }
}