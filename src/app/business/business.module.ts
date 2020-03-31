import { NgModule } from '@angular/core';
import { CronDemoComponent } from './cron/cron-demo/cron-demo.component';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessFactoryComponent } from './business-factory/business-factory.component';
import { SharedModule } from '../shared/shared.module';
import { BasicCronFormComponent } from './cron/snippets/basic-cron-form/basic-cron-form.component';

@NgModule({
  imports: [
    SharedModule,
    BusinessRoutingModule
  ],
  declarations: [
    CronDemoComponent,
    BusinessFactoryComponent,
    BasicCronFormComponent
  ],
  providers: [],
  exports: []
})
export class BusinessModule {

}
