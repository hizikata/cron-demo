import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CronDemoComponent } from './cron/cron-demo/cron-demo.component';
import { BusinessFactoryComponent } from './business-factory/business-factory.component';

const routes: Routes = [
  {
    // path: '',
    // component: BusinessFactoryComponent,
    // children: [
    //   { path: 'cron', component: CronDemoComponent },
    //   { path: '', redirectTo: './cron', pathMatch: 'full' }
    // ]
    path: 'cron', component: CronDemoComponent
  },
  { path: '', redirectTo: './cron', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
