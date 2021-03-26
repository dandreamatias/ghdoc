import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GhRepoService {
  private menuItemsSubject = new BehaviorSubject<string[]>([]);
  public readonly menuItems$ = this.menuItemsSubject.asObservable();

  constructor() { }


  public parseMd(readme: string): string {
    const raw: string[] = readme.split('\n');
    const menuItems = raw.filter(row => this.startWith(row.trim(), '## ')).map(row => row.slice(3, row.indexOf('[') < 0 ? row.length : row.indexOf('[')));
    this.menuItemsSubject.next(menuItems);
    return readme.slice(0, 4000)
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

