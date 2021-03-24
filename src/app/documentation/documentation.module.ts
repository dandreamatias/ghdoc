import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { HomeDocumentationComponent } from './home-documentation/home-documentation.component';
import { SharedModule } from '../shared.module';
import { Resolver } from './resolver';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    HomeDocumentationComponent
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
