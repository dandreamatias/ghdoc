import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  iconHome = faHome;
  iconSetting = faCog;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onHomeClick() {
    this.router.navigate([''])
  }

}
