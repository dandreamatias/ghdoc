import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class SharedModule { }
