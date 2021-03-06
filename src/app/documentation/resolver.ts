import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GhRepoService } from '../services/gh-repo.service';
import { GithubApiService } from '../services/github-api.service';
import { MaskService } from '../services/mask.service';

@Injectable()
export class Resolver implements Resolve<string> {
  constructor(private ghApi: GithubApiService,
    private maskService: MaskService,
    private ghRepo: GhRepoService) {
    maskService.setHttpProgressStatus(true);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const [username, repo] = state.url.slice(1).split('/');
    this.ghRepo.userName = username;
    this.ghRepo.repositoryName = repo;
    return this.ghApi.getReadme(username, repo).pipe(
      tap(data => this.ghRepo.parseMd(data))
    )
  }


}