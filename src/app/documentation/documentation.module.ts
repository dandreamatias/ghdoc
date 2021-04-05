import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { HomeDocumentationComponent } from './home-documentation/home-documentation.component';
import { SharedModule } from '../shared.module';
import { Resolver } from './resolver';
import { RouterModule } from '@angular/router';
import { GhPageComponent } from './home-documentation/gh-page/gh-page.component';


@NgModule({
  declarations: [
    HomeDocumentationComponent,
    GhPageComponent
  ],
  imports: [
    CommonModule,
    DocumentationRoutingModule,
    SharedModule,
    RouterModule
  ],
  providers: [Resolver]
})
export class DocumentationModule { }
