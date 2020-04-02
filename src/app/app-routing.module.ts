import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessFactoryComponent } from './business/business-factory/business-factory.component';


const routes: Routes = [
  {
    path: 'business',
    loadChildren: () => import('./business/business.module').then(mod => mod.BusinessModule)
  },
  {
    path: '', redirectTo: '/business', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    // { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
