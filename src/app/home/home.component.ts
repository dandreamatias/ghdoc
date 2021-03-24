import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  constructor(private githubApiService: GithubApiService) { }

  ngOnInit(): void {
  }


  onGoButtonClick(url: string) {
    const [username, repo] = this.parseUrl(url)
    this.githubApiService.getMarckDown('hello world').subscribe(console.log)
    this.githubApiService.getReadme(username, repo).subscribe(console.log)
  }

  private parseUrl(url: string): string[] {
    return url.slice(GITHUB_URL.length).split('/');
  }
}
