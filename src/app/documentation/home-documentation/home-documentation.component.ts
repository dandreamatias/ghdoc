import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GhRepoService } from 'src/app/services/gh-repo.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-home-documentation',
  templateUrl: './home-documentation.component.html',
  styleUrls: ['./home-documentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDocumentationComponent implements OnInit {
  currentText: string

  constructor(
    public menuService: MenuService,
    private router: Router,
    public ghRepoService: GhRepoService) { }

  ngOnInit(): void {
  }

  onMenuClick(menu) {
    this.currentText = menu;
    if (document.body.clientWidth < 900) {
      this.menuService.updatePosition(false);
    }
    this.router.navigate([this.ghRepoService.userName, this.ghRepoService.repositoryName, menu])
  }
}
