import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GhRepoService } from '../services/gh-repo.service';
import { GithubApiService } from '../services/github-api.service';
import * as marked from "marked";

@Injectable()
export class Resolver implements Resolve<string> {
  constructor(private ghApi: GithubApiService,
    private ghRepo: GhRepoService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {
    const [username, repo] = state.url.slice(1).split('/');
    this.ghRepo.userName = username;
    this.ghRepo.repositoryName = repo;

    if (localStorage.getItem(`${username}/${repo}`)) {
      return of(localStorage.getItem(`${username}/${repo}`)).pipe(
        map(data => this.ghRepo.parseMd(data)),
        map(sourceValue => marked(sourceValue) as string)
      )
    }


    return this.ghApi.getReadme(username, repo).pipe(
      tap(data => localStorage.setItem(`${username}/${repo}`, data)),
      map(data => this.ghRepo.parseMd(data)),
      map(sourceValue => marked(sourceValue) as string)
    )
  }


}