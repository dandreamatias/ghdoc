import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GhPageComponent } from './home-documentation/gh-page/gh-page.component';
import { HomeDocumentationComponent } from './home-documentation/home-documentation.component';
import { Resolver } from './resolver';

const routes: Routes = [

  {
    path: '',
    component: HomeDocumentationComponent,
    resolve: { readme: Resolver },
    children: [
      {
        path: ':section',
        component: GhPageComponent
      },
      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
