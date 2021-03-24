import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GithubApiService } from '../services/github-api.service';

@Injectable()
export class Resolver implements Resolve<string> {
  constructor(private ghApi: GithubApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const [username, repo] = state.url.slice(1).split('/');
    return this.ghApi.getReadme(username, repo).pipe(
      switchMap(sourceValue => this.ghApi.getMarckDown(sourceValue))
    )
  }
}