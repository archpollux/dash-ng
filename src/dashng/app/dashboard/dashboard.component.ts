import {
  Attribute,
  Component,
  ElementRef,
	OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { ContainerConfig, FlexContainerType } from '../shared/dashboard-config.model';
import { DashboardConfigService } from '../shared/dashboard-config.service';
import { ResizingComponent } from '../shared/resizing-component';

@Component({
  selector: 'dashng-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent extends ResizingComponent implements OnDestroy, OnInit {
  private configUrl: string;
  private configSub: Subscription;
  private config: ContainerConfig;

  constructor(el: ElementRef,
              renderer: Renderer2,
              private configService: DashboardConfigService) {
    super(el, renderer);
    this.configUrl = this.el.nativeElement.getAttribute('config-url');
  }

  ngOnInit() {
    this.configSub = this.configService
      .getConfig(this.configUrl)
      .subscribe(
        thisContainer => this.setConfig(thisContainer),
        console.error.bind(console)
      )
    ;
  }

  setConfig(thisContainer: ContainerConfig) {
    this.config = thisContainer;
  }

  ngOnDestroy() {
    this.configSub.unsubscribe();
  }
}
