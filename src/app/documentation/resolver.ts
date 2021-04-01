import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { GhRepoService } from '../services/gh-repo.service';
import { GithubApiService } from '../services/github-api.service';

@Injectable()
export class Resolver implements Resolve<string> {
  constructor(private ghApi: GithubApiService,
    private router: Router,
    private ghRepo: GhRepoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const [username, repo] = state.url.slice(1).split('/');
    return this.ghApi.getReadme(username, repo).pipe(
      map(data => this.ghRepo.parseMd(data)),
      switchMap(sourceValue => this.ghApi.getMarkDown(sourceValue))
    )
  }


}