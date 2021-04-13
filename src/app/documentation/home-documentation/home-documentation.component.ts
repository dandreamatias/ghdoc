import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHome, faGenderless } from '@fortawesome/free-solid-svg-icons';
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
  currentText: string;
  home = faGenderless;

  constructor(
    public menuService: MenuService,
    private router: Router,
    private cd: ChangeDetectorRef,
    public ghRepoService: GhRepoService) { }

  async ngOnInit() {
    this.ghRepoService.pages$.subscribe(res => {
      this.currentText = res.title ?? this.ghRepoService.firstPage;
      this.cd.detectChanges();
    });
  }

  onMenuClick(menu) {
    this.currentText = menu;
    if (document.body.clientWidth < 900) {
      this.menuService.updatePosition(false);
    }
    if (this.ghRepoService.isGhDocReadme) {
      this.router.navigate([this.ghRepoService.userName, this.ghRepoService.repositoryName, menu])
    } else {
      const html = document.getElementById(menu.toLowerCase().replace(/[^A-Za-z0-9\-\s]/g, '').replace(/ /g, '-'));
      html.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
