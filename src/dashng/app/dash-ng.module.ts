import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContainerComponent } from './container/container.component';
import { ContainerResizerDirective } from './shared/container-resizer.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardConfigService } from './shared/dashboard-config.service';
import { WidgetComponent } from './widget/widget.component';
import { WidgetHolderComponent } from './widget-holder/widget-holder.component';

@NgModule({
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  declarations: [
    ContainerComponent,
    ContainerResizerDirective,
    DashboardComponent,
    WidgetComponent,
    WidgetHolderComponent,
  ],
  providers: [
    DashboardConfigService
  ],
  bootstrap: [DashboardComponent]
})
export class DashNgModule { }
