import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { GhRepoService } from '../services/gh-repo.service';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  iconMenu = faBars;

  constructor(private menuService: MenuService,
    public ghRepoService: GhRepoService) { }

  ngOnInit(): void {
  }

  onMenuClick() {
    const isOpen = this.menuService.isOpen;
    this.menuService.updatePosition(!isOpen)
  }

  onGHClick() {
    (window as any).open(this.ghRepoService.url, "_blank")
  }

}
