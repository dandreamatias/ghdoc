import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as marked from "marked";
import { GITHUB_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class GhRepoService {
  private menuItemsSubject = new BehaviorSubject<string[]>([]);
  public readonly menuItems$ = this.menuItemsSubject.asObservable();
  private pages = new Map<string, string>()
  private pagesSubject = new Subject<string>();
  public readonly pages$ = this.pagesSubject.asObservable()
    .pipe(map(sourceValue => marked(sourceValue) as string));
  repositoryName: string;
  userName: string

  constructor() { }


  public parseMd(readme: string): string {
    const raw: string[] = readme.split('\n');
    const settings = []
    if (raw[0].includes('<!--- gh-md')) {
      raw.forEach((row, idx) => {
        if (this.startWith(row, '<!---') && row.includes('gh-md')) {
          const start = row.indexOf('gh-md') + 5;
          const end = row.indexOf('-->', start);
          settings.push({ index: idx, conf: row.slice(start, end).trim() })
        }
      })
    }
    const titles = settings.filter(setting => this.startWith(setting.conf, 'title'));
    const color = settings.filter(setting => this.startWith(setting.conf, 'color'));
    document.documentElement.style.setProperty(`--main-color`, this.getConfValue(color[0]));
    titles.forEach((setting, idx) => {
      const title = this.getConfValue(setting);
      this.pages.set(title, raw.slice(setting.index, titles[idx + 1] ? titles[idx + 1].index : raw.length).join('\n'))
    })
    this.menuItemsSubject.next(titles.map(title => this.getConfValue(title)));
    return this.pages.get(titles.map(title => this.getConfValue(title))[0]);
  }

  getConfValue(setting): string {
    return setting.conf.slice(setting.conf.indexOf('=') + 2, -1);
  }

  setPage(key: string) {
    this.pagesSubject.next(this.pages.get(key))
  }

  get url() {
    return GITHUB_URL + this.userName + '/' + this.repositoryName;
  }

  private startWith(row: string, match: string): boolean {
    for (let i = 0; i < match.length; i++) {
      if (match[i] === row[i]) {
        continue;
      }
      return false;
    }
    return true;
  }
}

