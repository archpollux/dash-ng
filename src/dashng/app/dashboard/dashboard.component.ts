import {
  Attribute,
  Component,
  ElementRef,
  HostListener,
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
        config => this.setConfig(config),
        console.error.bind(console)
      )
    ;
  }

  setConfig(config: ContainerConfig) {
    console.log('config', config);
    this.config = this.normalizeChildren(config);
  }

  ngOnDestroy() {
    this.configSub.unsubscribe();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    console.log('this.config', this.config);
    this.getActualSize(this.config.flexType);
  }
}
