import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as marked from "marked";
import { APP_COMMENT_IDENTIFIER, DEFAULT_COLOR, GITHUB_URL } from '../utils/constants';
import * as hljs from 'highlight.js'
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GhRepoService {
  private menuItemsSubject = new BehaviorSubject<string[]>([]);
  private pagesSubject = new BehaviorSubject<{ title: string, content: string }>({ title: null, content: null });
  public readonly menuItems$ = this.menuItemsSubject.asObservable();
  public readonly pages$ = this.pagesSubject.asObservable().pipe(shareReplay(1));
  public isGhDocReadme = false;

  private pages = new Map<string, string>();
  repositoryName: string;
  userName: string

  constructor() { }

  public parseMd(readme: string): void {
    const ArrayReadme = readme.trim().split('\n');
    this.isGhDocReadme = this.hasConfig(ArrayReadme[0]);
    if (this.isGhDocReadme) {
      this.ghDocParser(ArrayReadme);
    } else {
      this.defaultParser(ArrayReadme);
    }
  }

  public setPage(key: string) {
    this.pagesSubject.next({ title: key, content: this.pages.get(key) })
  }

  get url() {
    return GITHUB_URL + this.userName + '/' + this.repositoryName;
  }

  showFirstPage() {
    this.setPage(this.firstPage)
  }

  private ghDocParser(readme: string[]) {
    const settings: { index: number, conf: string }[] = [];
    readme.forEach((row, idx) => {
      if (this.startWith(row, '<!---') && row.includes(APP_COMMENT_IDENTIFIER)) {
        const start = row.indexOf(APP_COMMENT_IDENTIFIER) + APP_COMMENT_IDENTIFIER.length;
        const end = row.indexOf('-->', start);
        settings.push({ index: idx, conf: row.slice(start, end).trim() })
      }
    });

    const pages = settings.filter(setting => setting.conf.includes('title'));
    const pageSetting = settings.filter(setting => setting.conf.includes('primary-color'))[0];

    const colorIdx = pageSetting.conf.indexOf('primary-color');
    const themeIdx = pageSetting.conf.indexOf('theme');

    document.documentElement.style.setProperty(`--main-color`, colorIdx >= 0 ? this.getConfValue(pageSetting, colorIdx) : DEFAULT_COLOR);

    if (pages.length) {
      pages.forEach((page, idx) => {
        const titleIdx = page.conf.indexOf('title');
        const title = this.getConfValue(page, titleIdx);
        const content = readme.slice(page.index, pages[idx + 1] ? pages[idx + 1].index : readme.length).join('\n');
        const dom = new DOMParser().parseFromString(marked(content) as string, 'text/html');
        dom.body.querySelectorAll('pre').forEach(el => (hljs as any).highlightElement(el));
        this.pages.set(title, dom.body.outerHTML)
      });
    } else {
      const dom = new DOMParser().parseFromString(marked(readme.join('\n')) as string, 'text/html');
      dom.body.querySelectorAll('pre').forEach(el => (hljs as any).highlightElement(el));
      this.pages.set('home', dom.body.outerHTML);
    }

    this.menuItemsSubject.next(pages.length ? [...this.pages.keys()] : []);
  }

  get firstPage(): string {
    return [...this.pages.keys()][0];
  }

  private defaultParser(readme: string[]) {
    const titles = [];
    document.documentElement.style.setProperty(`--main-color`, DEFAULT_COLOR);
    const sanitizedRaw = this.sanitizeInternalLinks(readme);
    sanitizedRaw.forEach(row => {
      if ((this.startWith(row, '##') || this.startWith(row, '#')) && !this.startWith(row, '###')) {
        const titleStart = row.indexOf(' ')
        titles.push(row.slice(titleStart + 1));
      }
    })

    const dom = new DOMParser().parseFromString(marked(sanitizedRaw.join('\n')) as string, 'text/html');
    dom.body.querySelectorAll('pre').forEach(el => (hljs as any).highlightElement(el));
    this.pages.set(titles[0], dom.body.outerHTML);
    this.menuItemsSubject.next(titles);
  }

  private hasConfig(firstLine: string): boolean {
    return this.startWith(firstLine, '<!---') && firstLine.includes(APP_COMMENT_IDENTIFIER);
  }

  private getConfValue(setting, startFrom = 0): string {
    const valueStart = setting.conf.indexOf('=', startFrom)
    return setting.conf.slice(valueStart + 2, setting.conf.indexOf('"', (valueStart + 2)));
  }

  private sanitizeInternalLinks(raw: string[]): string[] {
    return raw.map(row => {
      const start = row.indexOf('](#');
      if (start >= 0) {
        if (this.startWith(row.trim(), '-')) {
          return '';
        }
        const diff = start - row.indexOf('[')
        return row.slice(0, start - diff);
      }
      return row
    });
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

