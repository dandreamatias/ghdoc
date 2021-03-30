import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GITHUB_API_URL } from '../utils/constants';
import { map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { GithubReposContentModel } from '../models/github-repos-content.model';
import { GitHubRepositoryInterface, GitHubSearchInterface } from '../models/github-search.model';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(private http: HttpClient) { }

  public getReadme(username: string, repo: string): Observable<string> {
    return this.http.get<GithubReposContentModel>(GITHUB_API_URL + `repos/${username}/${repo}/contents/README.md`)
      .pipe(
        map(data => atob(data.content))
      )
  }

  public getMarkDown(stringMd): Observable<string> {
    return this.http.post(GITHUB_API_URL + 'markdown', { text: stringMd }, {
      responseType: 'text',
      headers: {
        'Content-Type': 'text/x-markdown',
        accept: 'application/vnd.github.v3+json',
      },
      observe: 'body'
    })
  }


  public search(key): Observable<GitHubRepositoryInterface[]> {
    return this.http.get<GitHubSearchInterface>(GITHUB_API_URL + `search/repositories?q=${key} in:name`)
      .pipe(map(data => data.items))
  }
}