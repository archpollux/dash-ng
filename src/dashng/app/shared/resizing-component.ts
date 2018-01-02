import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren
} from '@angular/core';

import { ContainerConfig, FlexContainerType } from './dashboard-config.model';

export abstract class ResizingComponent {
  @Input() components: ContainerConfig[];
  @Input() flexType: FlexContainerType;
  @Input() flexSize: number;

  @ViewChildren('dashng-container') containers: QueryList<ResizingComponent>;

  constructor(protected el: ElementRef,
              protected renderer: Renderer2) { }

  getActualSize() {
    const el = this.el.nativeElement;
    this.flexSize = this.flexType === FlexContainerType.row ? el.offsetHeight : el.offsetWidth;
    console.log('flexSize', this.flexSize);
  }

  ngAfterViewInit() {
    console.log('containers', this.containers);
    this.getActualSize();
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.getActualSize();
  }

  resizeContainers(delta: number,
                   container1: ContainerConfig,
                   container2: ContainerConfig
  ) {
    if (!delta) return;
    console.log(delta, container1.flexSize, container2.flexSize);
    container1.flexSize += delta;
    container2.flexSize -= delta;
    console.log(container1.flexSize, container2.flexSize);
  }
}
