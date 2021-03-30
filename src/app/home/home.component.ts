import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GithubApiService } from '../services/github-api.service';
import { GITHUB_URL } from '../utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onGoButtonClick(url: string) {
    const [username, repo] = this.parseUrl(url)
    this.router.navigate([username, repo])
  }

  private parseUrl(url: string): string[] {
    return url.slice(GITHUB_URL.length).split('/');
  }
}
