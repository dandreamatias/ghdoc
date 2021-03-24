import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeDocumentationComponent } from './home-documentation/home-documentation.component';
import { Resolver } from './resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeDocumentationComponent,
    resolve: { readme: Resolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
