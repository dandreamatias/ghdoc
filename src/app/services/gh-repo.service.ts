import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import * as marked from "marked";
import { GITHUB_URL } from '../utils/constants';
import * as hljs from 'highlight.js'
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GhRepoService {
  private menuItemsSubject = new BehaviorSubject<string[]>([]);
  private pagesSubject = new BehaviorSubject<string>('');
  public readonly menuItems$ = this.menuItemsSubject.asObservable();
  public readonly pages$ = this.pagesSubject.asObservable();

  private pages = new Map<string, string>()
  repositoryName: string;
  userName: string

  constructor() { }

  public parseMd(readme: string): void {
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
      const content = raw.slice(setting.index, titles[idx + 1] ? titles[idx + 1].index : raw.length).join('\n');
      const dom = new DOMParser().parseFromString(marked(content) as string, 'text/html');
      dom.body.querySelectorAll('pre').forEach(el => (hljs as any).highlightElement(el));
      this.pages.set(title, dom.body.outerHTML)
    })
    this.menuItemsSubject.next([...this.pages.keys()]);
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

