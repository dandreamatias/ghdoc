import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: ':user/:repo',
    loadChildren: () => import('./documentation/documentation.module').then(m => m.DocumentationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }